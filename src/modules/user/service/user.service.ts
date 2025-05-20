import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { UserRepository } from '../repository/user.repository'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'
import { HashingServiceProtocol } from '../../../core/domain/abstractions/hashing.service'
import { UpdateUserDto } from '../dto/update-user.dto'

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

    async verifyByEmail(email: string): Promise<User> {
        const user = await this.repository.verifyByEmail(email)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async findById(id: number): Promise<Omit<User, 'password'>> {
        const user = await this.repository.findById(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async update(
        id: number,
        data: UpdateUserDto,
    ): Promise<Omit<User, 'password'>> {
        const user = await this.repository.findById(id)
        if (!user) throw new NotFoundException('User not found')
        await this.repository.update(id, data)
        return user
    }
}
