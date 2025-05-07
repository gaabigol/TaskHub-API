import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHealthCheck(): { status: string; message: string; date: string } {
        return {
            status: 'ok',
            message: 'Health check is ok',
            date: new Date().toISOString(),
        }
    }
}
