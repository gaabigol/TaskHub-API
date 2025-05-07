import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'generated/client'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
            log: ['error', 'warn'],
        })
    }

    async onModuleInit(): Promise<void> {
        await (this.$connect as () => Promise<void>)()
    }

    async onModuleDestroy(): Promise<void> {
        await (this.$disconnect as () => Promise<void>)()
    }
}
