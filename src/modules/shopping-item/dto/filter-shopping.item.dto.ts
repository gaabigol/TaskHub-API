import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { Unit, ShoppingCategory } from 'generated/client'

export class FilterShoppingItemDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true
        if (value === 'false') return false
        return value
    })
    purchased?: boolean

    @IsOptional()
    @IsEnum(Unit)
    unit?: Unit

    @IsOptional()
    @IsEnum(ShoppingCategory)
    category?: ShoppingCategory

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date
}
