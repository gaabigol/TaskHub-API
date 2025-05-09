import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { BcryptModule } from '../../core/infrastructure/providers/Bcrypt/bcrypt.module'
import { UserModule } from '../user/user.module'
import { ConfigModule } from '@nestjs/config'
import jwtConfig from 'src/core/infrastructure/config/jwt.config'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        BcryptModule,
        UserModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {}
