import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { TaskService } from '../service/task.service'

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
}
