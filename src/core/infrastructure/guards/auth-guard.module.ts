import { Module } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
    imports: [],
    providers: [
        AuthGuard,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AuthGuard],
})
export class AuthGuardModule {}
