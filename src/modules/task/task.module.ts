import { Module } from '@nestjs/common'
import { TaskController } from './controller/task.controller'
import { TaskService } from './service/task.service'
import { PrismaModule } from '../../core/infrastructure/database/prisma/prisma.module'
import { TaskRepository } from './repository/task.repository'

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
})
export class TaskModule {}
