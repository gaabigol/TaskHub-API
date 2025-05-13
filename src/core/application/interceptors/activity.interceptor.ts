import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { EntityMetadataHelper } from 'src/core/common/helpers/entity-metadata.helper'
import { ActivityService } from 'src/modules/activity/service/activity.service'

@Injectable()
export class ActivityInterceptor implements NestInterceptor {
    constructor(private activityService: ActivityService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        if (context.getType() !== 'http') {
            return next.handle()
        }

        const req = context.switchToHttp().getRequest()
        const handler = context.getHandler()

        const activityMeta = Reflect.getMetadata('activity', handler)
        if (!activityMeta) {
            return next.handle()
        }

        const { type, entityType } = activityMeta
        const userId = req.user?.sub

        const ipAddress = req.ip || req.connection.remoteAddress
        const userAgent = req.headers['user-agent']

        return next.handle().pipe(
            tap({
                next: async (responseData) => {
                    if (!responseData) return

                    const entityData = responseData.data || responseData
                    const entityId = entityData.id

                    if (!entityId) return

                    const details = EntityMetadataHelper.getEntityTitle(
                        entityType,
                        entityData,
                    )

                    await this.activityService.create({
                        type,
                        entityType,
                        entityId,
                        details,
                        ipAddress,
                        userAgent,
                        ...(userId
                            ? {
                                  userId,
                              }
                            : {}),
                    })
                },
                error: (error) => {
                    throw error
                },
            }),
        )
    }
}
