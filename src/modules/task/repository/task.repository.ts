import { BaseRepository } from 'src/core/domain/interfaces/base-repository.interface.ts'
import { PrismaService } from '../../../core/infrastructure/database/prisma/prisma.service'
import { Task } from 'generated/client'

export class TaskRepository implements BaseRepository<Task> {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Task): Promise<Task> {
        return await this.prismaService.task.create({ data })
    }
}
