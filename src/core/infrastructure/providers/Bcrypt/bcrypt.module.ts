import { Module } from '@nestjs/common'
import { HashingServiceProtocol } from '../../../domain/abstractions/hashing.service'
import { BcryptService } from './bcrypt.service'

@Module({
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService,
        },
    ],
    exports: [HashingServiceProtocol],
})
export class BcryptModule {}
