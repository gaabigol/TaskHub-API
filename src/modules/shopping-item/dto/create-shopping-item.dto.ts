import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { ShoppingCategory, Unit } from 'generated/client'
export class CreateShoppingItemDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @Length(1, 100, { message: 'Name must be between 1 and 255 characters' })
    name: string

    @IsNotEmpty({ message: 'Quantity is required' })
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity: number

    @IsNotEmpty({ message: 'Unit is required' })
    @IsEnum(Unit, {
        message: `The unii must be ${Object.values(Unit).join(', ')}`,
    })
    unit: Unit

    @IsNotEmpty({ message: 'Category is required' })
    @IsEnum(ShoppingCategory, {
        message: `The category must be ${Object.values(ShoppingCategory).join(', ')}`,
    })
    category: ShoppingCategory
}
