import { BaseRepository } from 'src/core/domain/interfaces/base-repository.interface.ts'
import { Activity, Prisma } from 'generated/client'
import { PrismaService } from 'src/core/infrastructure/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
@Injectable()
export class ActivityRepository implements BaseRepository<Activity> {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.ActivityCreateInput): Promise<Activity> {
        return this.prisma.activity.create({
            data,
        })
    }

    async getActivities(userId: number): Promise<Activity[]> {
        return this.prisma.activity.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
        })
    }
}
