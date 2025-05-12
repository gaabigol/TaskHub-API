import { IsDate, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class FilterNoteDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    content?: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date
}
