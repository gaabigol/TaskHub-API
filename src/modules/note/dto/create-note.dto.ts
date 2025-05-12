import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator'
import { NoteColor } from 'generated/client'
export class CreateNoteDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @Length(1, 100, { message: 'Title must be between 1 and 255 characters' })
    title: string

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    content: string

    @IsNotEmpty({ message: 'Color is required' })
    @IsEnum(NoteColor, {
        message: `The color must be ${Object.values(NoteColor).join(', ')}`,
    })
    color: NoteColor
}
