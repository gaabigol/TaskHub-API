import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator'
import { Category, Priority } from 'generated/client'

export class CreateTaskDto {
    @IsNotEmpty({ message: 'O título não pode estar vazio' })
    @IsString({ message: 'O título deve ser uma string' })
    @Length(3, 100, { message: 'O título deve ter entre 3 e 100 caracteres' })
    title: string

    @IsOptional()
    @IsBoolean({ message: 'O campo completed deve ser um booleano' })
    completed: boolean = false

    @IsEnum(Priority, {
        message: `A prioridade deve ser um dos seguintes valores: ${Object.values(Priority).join(', ')}`,
    })
    @IsNotEmpty({ message: 'A prioridade não pode estar vazia' })
    priority: Priority

    @IsNotEmpty({ message: 'A categoria não pode estar vazia' })
    @IsEnum(Category, {
        message: `A categoria deve ser um dos seguintes valores: ${Object.values(Category).join(', ')}`,
    })
    category: Category
}
