import { BaseRepository } from 'src/core/domain/interfaces/base-repository.interface.ts'
import { Prisma, Task } from 'generated/client'
import { PrismaService } from 'src/core/infrastructure/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { FilterTaskDto } from '../dto/filter-task.dto'

@Injectable()
export class TaskRepository implements BaseRepository<Task> {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
        })
    }

    async findAllByUser(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async update(id: number, data: UpdateTaskDto) {
        return this.prisma.task.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                completed: data.completed,
                priority: data.priority,
                category: data.category,
            },
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.task.delete({
            where: {
                id,
            },
        })
    }

    async findById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: {
                id,
            },
        })
    }

    async findByUserAndId(id: number, userId: number): Promise<Task | null> {
        const task = await this.prisma.task.findFirst({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
        })
        return task
    }

    async findByFilters(
        filterParams: FilterTaskDto,
        userId: number,
    ): Promise<Task[]> {
        const where: Prisma.TaskWhereInput = {}

        if (filterParams.title !== undefined) {
            where.title = {
                contains: filterParams.title,
            }
        }

        if (filterParams.completed !== undefined) {
            where.completed = filterParams.completed
        }

        if (filterParams.priority !== undefined) {
            where.priority = filterParams.priority
        }

        if (filterParams.category !== undefined) {
            where.category = filterParams.category
        }

        if (filterParams.createdAt !== undefined) {
            where.createdAt = filterParams.createdAt
        }

        return this.prisma.task.findMany({
            where: {
                user: {
                    id: userId,
                },
                ...where,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }
}
