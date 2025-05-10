// src/core/infrastructure/providers/export/export.module.ts
import { Module } from '@nestjs/common'
import { ExportService } from './export.service'

@Module({
    providers: [
        {
            provide: 'IExportService',
            useClass: ExportService,
        },
        ExportService,
    ],
    exports: ['IExportService', ExportService],
})
export class ExportModule {}
