import { Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
import { PrismaModule } from '../../core/infrastructure/database/prisma/prisma.module'
import { UserRepository } from './repository/user.repository'

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
