import { PartialType } from '@nestjs/mapped-types'
import { CreateShoppingItemDto } from './create-shopping-item.dto'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateShoppingItemDto extends PartialType(CreateShoppingItemDto) {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    id: number

    @IsOptional()
    @IsBoolean({ message: 'Purchased must be a boolean' })
    purchased?: boolean
}
