import { PartialType } from '@nestjs/mapped-types'
import { CreateTaskDto } from './create-task.dto'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    id: number
}
