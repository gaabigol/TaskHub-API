import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/modules/user/service/user.service'
import { AuthDto } from '../dto/auth.dto'
import { HashingServiceProtocol } from '../../../core/domain/abstractions/hashing.service'
import jwtConfig from '../../../core/infrastructure/config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashingService: HashingServiceProtocol,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
    ) {}

    async authenticate(data: AuthDto): Promise<{
        id: number
        email: string
        username: string
        displayName: string | null
        avatarInitials: string | null
        createdAt: Date
        updatedAt: Date
        token: string
    }> {
        const user = await this.userService.verifyByEmail(data.email)
        if (
            !(await this.hashingService.compare(data.password, user.password))
        ) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            },
        )

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName,
            avatarInitials: user.avatarInitials,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: token,
        }
    }
}
