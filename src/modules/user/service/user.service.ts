import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'
import { PaginationDto } from 'src/core/application/dtos/pagination.dto'
import { User } from 'generated/client'

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async findAll(data: PaginationDto): Promise<{
        data: User[]
        meta: {
            total: number
            page: number
            limit: number
            lastPage: number
        }
    }> {
        return await this.repository.findAll(data)
    }
}
