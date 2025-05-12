import { Module } from '@nestjs/common'
import { ShoppingItemController } from './controller/shopping-item.controller'
import { ShoppingItemService } from './service/shopping-item.service'
import { ShoppingItemRepository } from './repository/shopping-item.repository'
import { PrismaModule } from '../../core/infrastructure/database/prisma/prisma.module'
import { UserModule } from '../user/user.module'
import { ExportModule } from 'src/core/infrastructure/providers/export/export.module'

@Module({
    imports: [PrismaModule, UserModule, ExportModule],
    controllers: [ShoppingItemController],
    providers: [ShoppingItemService, ShoppingItemRepository],
    exports: [ShoppingItemService],
})
export class ShoppingItemModule {}
