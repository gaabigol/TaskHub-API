import {
    Controller,
    Post,
    Body,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Delete,
    Param,
    ParseIntPipe,
    Query,
    Res,
} from '@nestjs/common'
import { TaskService } from '../service/task.service'
import { CreateTaskDto } from '../dto/create-task.dto'
import { SessionUser } from 'src/core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { FilterTaskDto } from '../dto/filter-task.dto'
import { ExportService } from 'src/core/infrastructure/providers/export/export.service'
import { Response } from 'express'

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly exportService: ExportService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateTaskDto, @SessionUser() session: Session) {
        const task = await this.taskService.create(data, session.sub)
        return {
            success: true,
            message: 'Task created successfully',
            data: task,
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() data: FilterTaskDto,
        @SessionUser() session: Session,
    ) {
        const tasks = await this.taskService.findByFilters(data, session.sub)
        return {
            total: tasks?.length,
            data: tasks,
        }
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async update(@Body() data: UpdateTaskDto, @SessionUser() session: Session) {
        const task = await this.taskService.update(session.sub, data)
        return {
            success: true,
            message: 'Task updated successfully',
            data: task,
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @SessionUser() session: Session,
    ) {
        await this.taskService.delete(id, session.sub)
        return {
            success: true,
            message: 'Task deleted successfully',
        }
    }

    @Get('export/:format')
    async exportTasks(
        @Param('format') format: 'pdf' | 'csv',
        @Query() filterDto: FilterTaskDto,
        @SessionUser() session: Session,
        @Res() res: Response,
    ) {
        const tasks = await this.taskService.findByFilters(
            filterDto,
            session.sub,
        )

        const buffer = await this.exportService.exportData({
            data: tasks,
            fileName: 'tarefas',
            format,
            columns: [
                { header: 'ID', accessor: 'id' },
                { header: 'Título', accessor: 'title' },
                { header: 'Categoria', accessor: 'category' },
                { header: 'Prioridade', accessor: 'priority' },
                { header: 'Concluída', accessor: 'completed' },
                { header: 'Data de Criação', accessor: 'createdAt' },
            ],
            documentHeader: {
                title: 'Relatório de Tarefas',
                subtitle: 'Sistema de Gerenciamento de Tarefas',
            },
        })

        const contentType = format === 'pdf' ? 'application/pdf' : 'text/csv'
        const extension = format === 'pdf' ? 'pdf' : 'csv'
        const filename = `tarefas_${new Date().toISOString().slice(0, 10)}.${extension}`

        res.set({
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': buffer.length,
        })

        res.status(HttpStatus.OK).send(buffer)
    }
}
