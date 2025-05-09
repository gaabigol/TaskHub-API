import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import jwtConfig from '../config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { REQUEST_USER_KEY } from '../../common/constants/auth.constant'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name)
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        )
        if (isPublic) return true

        const request: Request = context.switchToHttp().getRequest()
        const token = this.extractTokenHeader(request)
        if (!token) throw new UnauthorizedException('No token provided')

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration,
            )
            request[REQUEST_USER_KEY] = payload
            return true
        } catch (error) {
            throw new UnauthorizedException('Unauthorized access: ', error)
        }
    }

    private extractTokenHeader(request: Request) {
        const authorization = request.headers?.authorization
        if (!authorization || typeof authorization !== 'string') {
            return undefined
        }
        const [type, token] = authorization.split(' ')

        if (type !== 'Bearer' || !token) {
            return undefined
        }

        return token
    }
}
