import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
} from '@nestjs/common'
import { UserService } from '../service/user.service'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'
import { Public } from '../../../core/common/decorators/public.decorator'
import { SessionUser } from '../../../core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto): Promise<{
        success: boolean
        message: string
        data: Omit<User, 'password'>
    }> {
        const user = await this.userService.create(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user
        return {
            success: true,
            message: 'User created successfully',
            data: userWithoutPassword,
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findById(@SessionUser() session: Session): Promise<{
        success: boolean
        data: Omit<User, 'password'>
    }> {
        const user = await this.userService.findById(session.sub)
        return {
            success: true,
            data: user,
        }
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async update(@Body() data: UpdateUserDto, @SessionUser() session: Session) {
        const user = await this.userService.update(session.sub, data)
        return {
            success: true,
            message: 'User updated successfully',
            data: user,
        }
    }
}
