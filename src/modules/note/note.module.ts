import { Module } from '@nestjs/common'
import { NoteService } from './service/note.service'
import { NoteController } from './controller/note.controller'
import { NoteRepository } from './repository/note.repository'
import { ExportModule } from 'src/core/infrastructure/providers/export/export.module'
import { PrismaModule } from 'src/core/infrastructure/database/prisma/prisma.module'
import { UserModule } from '../user/user.module'

@Module({
    imports: [UserModule, PrismaModule, ExportModule],
    controllers: [NoteController],
    providers: [NoteService, NoteRepository],
    exports: [NoteService],
})
export class NoteModule {}
