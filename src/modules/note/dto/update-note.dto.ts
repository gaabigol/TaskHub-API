import { PartialType } from '@nestjs/mapped-types'
import { CreateNoteDto } from './create-note.dto'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    id: number
}
