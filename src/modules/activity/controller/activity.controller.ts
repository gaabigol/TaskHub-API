import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ActivityService } from '../service/activity.service'
import { SessionUser } from 'src/core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'
@Controller('activity')
export class ActivityController {
    constructor(private readonly service: ActivityService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@SessionUser() session: Session) {
        const activities = await this.service.getActivities(session.sub)
        return {
            total: activities?.length,
            data: activities,
        }
    }
}
