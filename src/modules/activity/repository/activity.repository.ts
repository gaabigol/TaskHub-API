import { BaseRepository } from '../../../core/domain/interfaces/base-repository.interface.ts'
import { PrismaService } from '../../../core/infrastructure/database/prisma/prisma.service'
import { Activity, Prisma } from 'generated/client'
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
