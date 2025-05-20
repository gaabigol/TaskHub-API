import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove unknown properties from request payload
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
