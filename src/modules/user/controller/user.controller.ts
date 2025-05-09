import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { PaginationDto } from 'src/core/application/dtos/pagination.dto'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'
import { TokenPayload } from 'src/core/common/decorators/token-payload.decorator'
import { PayloadTokenDto } from 'src/core/application/dtos/payload-token.dto'
import { Public } from '../../../core/common/decorators/public.decorator'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
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
    async findAll(
        @Query() data: PaginationDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @TokenPayload() tokenPayload: PayloadTokenDto,
    ): Promise<{
        data: User[]
        meta: {
            total: number
            page: number
            limit: number
            lastPage: number
        }
    }> {
        return await this.userService.findAll(data)
    }
}
