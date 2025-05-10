import { Module } from '@nestjs/common'
import { TaskController } from './controller/task.controller'
import { TaskService } from './service/task.service'
import { TaskRepository } from './repository/task.repository'
import { UserModule } from '../user/user.module'
import { PrismaModule } from 'src/core/infrastructure/database/prisma/prisma.module'
import { ExportModule } from 'src/core/infrastructure/providers/export/export.module'

@Module({
    imports: [UserModule, PrismaModule, ExportModule],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskService],
})
export class TaskModule {}
