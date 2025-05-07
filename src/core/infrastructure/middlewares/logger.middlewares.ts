import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            req['user'] = {
                token: req.headers.authorization.split(' ')[1],
            }
        }
        next()
    }
}
