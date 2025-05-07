import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../core/infrastructure/database/prisma/prisma.service'
import { BaseRepository } from '../../../core/domain/interfaces/base-repository.interface.ts'
import { PaginationDto } from 'src/core/application/dtos/pagination.dto'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class UserRepository implements BaseRepository<User> {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({ data })
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } })
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({ where: { id }, data })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } })
    }

    async findAll(paginationDto: PaginationDto): Promise<{
        data: User[]
        meta: {
            total: number
            page: number
            limit: number
            lastPage: number
        }
    }> {
        const { page, limit } = paginationDto
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.user.count(),
        ])

        const lastPage = Math.ceil(total / limit)

        return {
            data,
            meta: {
                total,
                page,
                limit,
                lastPage,
            },
        }
    }
}
