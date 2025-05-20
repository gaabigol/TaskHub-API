import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../core/infrastructure/database/prisma/prisma.service'
import { User } from 'generated/client'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({ data })
    }

    async findById(id: number): Promise<Omit<User, 'password'> | null> {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: false,
                displayName: true,
                avatarInitials: true,
            },
        })
    }

    async update(id: number, data: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: {
                displayName: data.displayName,
                avatarInitials: data.avatarInitials,
            },
        })
    }

    async verifyByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } })
    }

    async verifyByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { username } })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } })
    }
}
