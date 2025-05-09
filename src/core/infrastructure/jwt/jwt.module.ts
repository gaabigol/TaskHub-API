import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from '../config/jwt.config'

@Global()
@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    exports: [JwtModule, ConfigModule],
})
export class JwtGlobalModule {}
