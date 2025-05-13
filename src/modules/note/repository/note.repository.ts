import { BaseRepository } from 'src/core/domain/interfaces/base-repository.interface.ts'
import { Note, Prisma } from 'generated/client'
import { PrismaService } from 'src/core/infrastructure/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { UpdateNoteDto } from '../dto/update-note.dto'
import { FilterNoteDto } from '../dto/filter-note.dto'

@Injectable()
export class NoteRepository implements BaseRepository<Note> {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.NoteCreateInput): Promise<Note> {
        return this.prisma.note.create({
            data,
        })
    }

    async update(id: number, data: UpdateNoteDto) {
        return this.prisma.note.update({
            where: {
                id,
            },
            data,
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.note.delete({
            where: {
                id,
            },
        })
    }

    async findById(id: number): Promise<Note | null> {
        return this.prisma.note.findUnique({
            where: {
                id,
            },
        })
    }

    async findByUserAndId(id: number, userId: number): Promise<Note | null> {
        const task = await this.prisma.note.findFirst({
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
        params: FilterNoteDto,
        userId: number,
    ): Promise<Note[]> {
        const where: Prisma.NoteWhereInput = {}

        if (params.title !== undefined) {
            where.title = {
                contains: params.title,
            }
        }

        if (params.content !== undefined) {
            where.content = {
                contains: params.content,
            }
        }

        if (params.createdAt !== undefined) {
            where.createdAt = {
                gte: params.createdAt,
            }
        }

        return this.prisma.note.findMany({
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

    async getAll(userId: number): Promise<Note[]> {
        return this.prisma.note.findMany({
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
}
