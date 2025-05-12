import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
    Query,
    ParseIntPipe,
} from '@nestjs/common'
import { NoteService } from '../service/note.service'
import { CreateNoteDto } from '../dto/create-note.dto'
import { UpdateNoteDto } from '../dto/update-note.dto'
import { SessionUser } from 'src/core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'
import { FilterNoteDto } from '../dto/filter-note.dto'

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateNoteDto, @SessionUser() session: Session) {
        const note = await this.noteService.create(data, session.sub)
        return {
            success: true,
            message: 'Note created successfully',
            data: note,
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() data: FilterNoteDto,
        @SessionUser() session: Session,
    ) {
        const note = await this.noteService.findByFilters(data, session.sub)
        return {
            total: note?.length,
            data: note,
        }
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async update(@Body() data: UpdateNoteDto, @SessionUser() session: Session) {
        const note = await this.noteService.update(session.sub, data)
        return {
            success: true,
            message: 'Note updated successfully',
            data: note,
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @SessionUser() session: Session,
    ) {
        await this.noteService.delete(id, session.sub)
        return {
            success: true,
            message: 'note deleted successfully',
        }
    }
}
