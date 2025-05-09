import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'
import { PaginationDto } from 'src/core/application/dtos/pagination.dto'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'
import { HashingServiceProtocol } from '../../../core/domain/abstractions/hashing.service'

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
        private readonly hashingService: HashingServiceProtocol,
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        if (await this.repository.verifyByEmail(data.email)) {
            throw new ConflictException('Email already exists')
        }
        if (await this.repository.verifyByUsername(data.username)) {
            throw new ConflictException('Username already exists')
        }
        const hashedPassword = await this.hashingService.hash(data.password)
        return await this.repository.create({
            ...data,
            password: hashedPassword,
        })
    }

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

    async verifyByEmail(email: string): Promise<User> {
        const user = await this.repository.verifyByEmail(email)
        if (!user) throw new NotFoundException('User not found')
        return user
    }
}
