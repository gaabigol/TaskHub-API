import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString({ message: 'Display name must be a string' })
    @IsOptional()
    displayName?: string

    @IsString({ message: 'Avatar initials must be a string' })
    @IsOptional()
    avatarInitials?: string
}
