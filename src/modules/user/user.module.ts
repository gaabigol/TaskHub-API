import { Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
import { PrismaModule } from '../../core/infrastructure/database/prisma/prisma.module'
import { UserRepository } from './repository/user.repository'
import { BcryptModule } from '../../core/infrastructure/providers/Bcrypt/bcrypt.module'

@Module({
    imports: [PrismaModule, BcryptModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
