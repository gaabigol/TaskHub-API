import { Injectable } from '@nestjs/common'
import { ActivityRepository } from '../repository/activity.repository'
import { Activity, Prisma } from 'generated/client'

@Injectable()
export class ActivityService {
    constructor(private readonly service: ActivityRepository) {}

    async create(data: Prisma.ActivityCreateInput) {
        return await this.service.create(data)
    }

    async getActivities(userId: number): Promise<Activity[]> {
        return await this.service.getActivities(userId)
    }
}
