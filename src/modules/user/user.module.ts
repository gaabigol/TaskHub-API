import { Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
import { UserRepository } from './repository/user.repository'
import { BcryptModule } from '../../core/infrastructure/providers/Bcrypt/bcrypt.module'
import { PrismaModule } from 'src/core/infrastructure/database/prisma/prisma.module'

@Module({
    imports: [BcryptModule, PrismaModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
