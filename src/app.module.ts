import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { AppController } from './modules/app/app.controller'
import { AppService } from './modules/app/app.service'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerMiddleware } from './core/infrastructure/middlewares/logger.middlewares'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ExceptionFilter } from './core/infrastructure/filters/exception-filter'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { TaskModule } from './modules/task/task.module'
import { AuthGuardModule } from './core/infrastructure/guards/auth-guard.module'
import { JwtGlobalModule } from './core/infrastructure/jwt/jwt.module'
import { ShoppingItemModule } from './modules/shopping-item/shopping-item.module'
import { NoteModule } from './modules/note/note.module'
import { ActivityModule } from './modules/activity/activity.module'
import { ActivityInterceptor } from './core/application/interceptors/activity.interceptor'
import { DashboardModule } from './modules/dashboard/dashboard.module'

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                name: '100_CALL_PER_MINUTE',
                ttl: 60000,
                limit: 100,
            },
        ]),
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        TaskModule,
        AuthGuardModule,
        JwtGlobalModule,
        ShoppingItemModule,
        NoteModule,
        ActivityModule,
        DashboardModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ActivityInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        })
    }
}
