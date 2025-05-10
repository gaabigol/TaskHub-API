import { Injectable } from '@nestjs/common'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Parser as CsvParser } from 'json2csv'
import { FormatDateUtil } from 'src/core/common/util/format.date'
import { ExportableEntity } from 'src/core/domain/types/export.type'
import {
    DocumentHeader,
    ExportConfig,
    IExportService,
} from 'src/core/domain/interfaces/export/export.interface'

@Injectable()
export class ExportService implements IExportService {
    async exportData<T extends ExportableEntity>(
        config: ExportConfig<T>,
    ): Promise<Buffer> {
        const { data, fileName, format, columns, documentHeader } = config

        if (format === 'pdf') {
            return this.exportToPdf(data, fileName, columns, documentHeader)
        } else if (format === 'csv') {
            return this.exportToCsv(data, fileName, columns)
        }

        throw new Error(`Formato de exportação não suportado: ${format}`)
    }

    private async exportToPdf<T extends ExportableEntity>(
        data: T[],
        fileName: string,
        columns: ExportConfig<T>['columns'],
        documentHeader?: DocumentHeader,
    ): Promise<Buffer> {
        // Criar instância do PDF
        const doc = new jsPDF()

        // Adicionar cabeçalho
        if (documentHeader) {
            const { title, subtitle } = documentHeader

            // Título principal
            doc.setFontSize(18)
            doc.text(title, 14, 22)

            // Subtítulo (se existir)
            if (subtitle) {
                doc.setFontSize(12)
                doc.text(subtitle, 14, 30)
            }

            // Data de geração
            const dateText = `Gerado em: ${FormatDateUtil.formatDate(new Date())}`
            doc.setFontSize(10)
            doc.text(dateText, 14, subtitle ? 38 : 30)
        }

        // Preparar dados para tabela
        const tableHeaders = columns.map((col) => col.header)
        const tableData = data.map((item) => {
            return columns.map((col) => {
                const value =
                    typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : item[col.accessor]

                // Converter booleanos para Sim/Não
                if (typeof value === 'boolean') {
                    return value ? 'Sim' : 'Não'
                }

                // Formatar datas
                if (value instanceof Date) {
                    return FormatDateUtil.formatDate(value)
                }

                return value !== null && value !== undefined
                    ? String(value)
                    : ''
            })
        })
        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
            startY: documentHeader ? 45 : 20,
            styles: {
                cellPadding: 3,
                fontSize: 10,
                textColor: [0, 0, 0],
                lineColor: [200, 200, 200],
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
        })

        // No backend, retornamos o buffer em vez de salvar o arquivo
        return Buffer.from(doc.output('arraybuffer'))
    }

    private async exportToCsv<T extends ExportableEntity>(
        data: T[],
        fileName: string,
        columns: ExportConfig<T>['columns'],
    ): Promise<Buffer> {
        // Preparar dados para CSV
        const csvData = data.map((item) => {
            const row: Record<string, string> = {}

            columns.forEach((col) => {
                const header = col.header
                const value =
                    typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : item[col.accessor]

                // Converter booleanos para Sim/Não
                if (typeof value === 'boolean') {
                    row[header] = value ? 'Sim' : 'Não'
                    return
                }

                // Formatar datas
                if (value instanceof Date) {
                    row[header] = FormatDateUtil.formatDate(value)
                    return
                }

                row[header] =
                    value !== null && value !== undefined ? String(value) : ''
            })

            return row
        })

        try {
            // Usar json2csv para converter para CSV no backend
            const json2csvParser = new CsvParser({
                fields: columns.map((col) => ({
                    label: col.header,
                    value: col.header,
                })),
            })
            const csv = json2csvParser.parse(csvData)

            // Retornar o buffer
            return Buffer.from(csv, 'utf-8')
        } catch (err) {
            throw new Error(`Erro ao gerar CSV: ${err.message}`)
        }
    }
}
