import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from '../repository/task.repository'
import { CreateTaskDto } from '../dto/create-task.dto'
import { UserService } from 'src/modules/user/service/user.service'
import { Task } from 'generated/client'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { FilterTaskDto } from '../dto/filter-task.dto'

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly userService: UserService,
    ) {}

    async create(data: CreateTaskDto, userId: number): Promise<Task> {
        const user = await this.userService.findById(userId)
        return this.taskRepository.create({
            title: data.title,
            priority: data.priority,
            category: data.category,
            completed: data.completed,
            user: {
                connect: {
                    id: user.id,
                },
            },
        })
    }

    async findByFilters(data: FilterTaskDto, userId: number): Promise<Task[]> {
        return this.taskRepository.findByFilters(data, userId)
    }

    async update(userId: number, data: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findByUserAndId(userId, data.id)
        if (!task) throw new NotFoundException('Task not found')
        return this.taskRepository.update(task.id, data)
    }

    async delete(id: number, userId: number): Promise<void> {
        const task = await this.taskRepository.findByUserAndId(id, userId)
        if (!task) throw new NotFoundException('Task not found')
        return this.taskRepository.delete(task.id)
    }
}
