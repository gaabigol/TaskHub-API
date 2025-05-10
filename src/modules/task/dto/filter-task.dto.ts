import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { Priority, Category } from 'generated/client'

export class FilterTaskDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true
        if (value === 'false') return false
        return value
    })
    completed?: boolean

    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority

    @IsOptional()
    @IsEnum(Category)
    category?: Category

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date
}
