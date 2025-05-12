import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
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
        const userId = req.user?.id

        return next.handle().pipe(
            tap({
                next: async (data) => {
                    try {
                        if (!data) return

                        const entityId = data.id
                        if (!entityId) return
                        await this.activityService.create({
                            type,
                            entityType,
                            entityId,
                            ...(userId
                                ? {
                                      user: {
                                          connect: { id: userId },
                                      },
                                  }
                                : {}),
                        })
                    } catch (error) {
                        console.error('Erro ao registrar atividade:', error)
                    }
                },
                error: () => {},
            }),
        )
    }
}
