import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
    })

    app.enableCors({
        origin: ['http://localhost:3000', 'https://task-hub-front.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
