import {
    ArgumentsHost,
    Catch,
    ExceptionFilter as NestExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const message = exception.getResponse()

            return response.status(status).json({
                error: true,
                timestamp: Math.floor(Date.now() / 1000),
                message: message,
                path: request.url,
            })
        }

        const status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = 'Internal Server Error'

        if (exception instanceof Error) {
            message = exception.message
        }

        return response.status(status).json({
            error: true,
            timestamp: Math.floor(Date.now() / 1000),
            message: message,
            path: request.url,
        })
    }
}
