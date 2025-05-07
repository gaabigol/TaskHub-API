import { ArgumentsHost, Catch, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class ExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const message = exception.getResponse()

        response.status(status).json({
            error: true,
            timestamp: Math.floor(Date.now() / 1000),
            message: message,
            path: request.url,
        })
    }
}
