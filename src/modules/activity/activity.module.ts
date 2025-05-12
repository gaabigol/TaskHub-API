import { Global, Module } from '@nestjs/common'
import { ExportModule } from 'src/core/infrastructure/providers/export/export.module'
import { UserModule } from '../user/user.module'
import { PrismaModule } from 'src/core/infrastructure/database/prisma/prisma.module'
import { ActivityController } from './controller/activity.controller'
import { ActivityService } from './service/activity.service'
import { ActivityRepository } from './repository/activity.repository'
import { ActivityInterceptor } from 'src/core/application/interceptors/activity.interceptor'

@Global()
@Module({
    imports: [PrismaModule, UserModule, ExportModule],
    controllers: [ActivityController],
    providers: [ActivityService, ActivityRepository, ActivityInterceptor],
    exports: [ActivityService, ActivityInterceptor],
})
export class ActivityModule {}
