// src/core/domain/interfaces/export/export.interface.ts

import { ExportableEntity } from '../../types/export.type'

export interface DocumentHeader {
    title: string
    subtitle?: string
    logo?: string
}

export type ExportFormat = 'pdf' | 'csv'

export interface ExportConfig<T extends ExportableEntity> {
    data: T[]
    fileName: string
    format: ExportFormat
    columns: {
        header: string
        accessor: keyof T | ((item: T) => string | number | boolean | null)
    }[]
    documentHeader?: DocumentHeader
}

export interface IExportService {
    exportData<T extends ExportableEntity>(
        config: ExportConfig<T>,
    ): Promise<Buffer>
}
