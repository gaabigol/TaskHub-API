import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { DashboardService } from '../service/dashboard.service'
import { SessionUser } from '../../../core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly service: DashboardService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getDashboardSummary(@SessionUser() session: Session) {
        const data = await this.service.getDashboardSummary(session.sub)
        return {
            success: true,
            data,
        }
    }
}
