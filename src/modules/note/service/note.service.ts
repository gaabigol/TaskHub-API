import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateNoteDto } from '../dto/create-note.dto'
import { NoteRepository } from '../repository/note.repository'
import { UserService } from '../../user/service/user.service'
import { FilterNoteDto } from '../dto/filter-note.dto'
import { Note } from 'generated/client'
import { UpdateNoteDto } from '../dto/update-note.dto'

@Injectable()
export class NoteService {
    constructor(
        private readonly repository: NoteRepository,
        private readonly userService: UserService,
    ) {}

    async create(data: CreateNoteDto, userId: number) {
        const user = await this.userService.findById(userId)
        return this.repository.create({
            title: data.title,
            content: data.content,
            color: data.color,
            user: {
                connect: {
                    id: user.id,
                },
            },
        })
    }

    async findByFilters(data: FilterNoteDto, userId: number): Promise<Note[]> {
        return this.repository.findByFilters(data, userId)
    }

    async update(userId: number, data: UpdateNoteDto): Promise<Note> {
        const task = await this.repository.findByUserAndId(data.id, userId)
        if (!task) throw new NotFoundException('Note not found')
        return this.repository.update(task.id, data)
    }

    async delete(id: number, userId: number): Promise<void> {
        const task = await this.repository.findByUserAndId(id, userId)
        if (!task) throw new NotFoundException('note not found')
        return this.repository.delete(task.id)
    }

    async getAll(userId: number): Promise<Note[]> {
        return this.repository.getAll(userId)
    }
}
