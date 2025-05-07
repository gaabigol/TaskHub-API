import { Controller, Get, Query } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { PaginationDto } from 'src/core/application/dtos/pagination.dto'
import { User } from 'generated/client'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(@Query() data: PaginationDto): Promise<{
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
