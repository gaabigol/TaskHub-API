import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { REQUEST_USER_KEY } from '../constants/auth.constant'

export const TokenPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const context = ctx.switchToHttp()
        const request: Request = context.getRequest()
        return request[REQUEST_USER_KEY]
    },
)
