import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { HashingServiceProtocol } from '../../../domain/abstractions/hashing.service'

@Injectable()
export class BcryptService implements HashingServiceProtocol {
    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt())
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}
