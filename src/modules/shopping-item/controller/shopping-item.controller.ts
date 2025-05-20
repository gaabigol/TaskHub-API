import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
    ParseIntPipe,
} from '@nestjs/common'
import { CreateShoppingItemDto } from '../dto/create-shopping-item.dto'
import { SessionUser } from '../../../core/common/decorators/session-user.decorator'
import { Session } from '../../../core/application/dtos/session.dto'
import { ShoppingItemService } from '../service/shopping-item.service'
import { FilterShoppingItemDto } from '../dto/filter-shopping.item.dto'
import { UpdateShoppingItemDto } from '../dto/update-shopping-item.dto'
import { ExportService } from '../../../core/infrastructure/providers/export/export.service'
import { LogActivity } from '../../../core/common/decorators/activity.decorator'
import { ActivityType, EntityType } from 'generated/client'

@Controller('shopping-item')
export class ShoppingItemController {
    constructor(
        private readonly service: ShoppingItemService,
        private readonly exportService: ExportService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @LogActivity(ActivityType.CREATE, EntityType.SHOPPING_ITEM)
    async create(
        @Body() data: CreateShoppingItemDto,
        @SessionUser() session: Session,
    ) {
        const shoppingItem = await this.service.create(data, session.sub)

        return {
            success: true,
            message: 'Shopping item created successfully',
            data: shoppingItem,
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() data: FilterShoppingItemDto,
        @SessionUser() session: Session,
    ) {
        const shoppingItems = await this.service.findByFilters(
            data,
            session.sub,
        )
        return {
            total: shoppingItems?.length,
            data: shoppingItems,
        }
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    async update(
        @Body() data: UpdateShoppingItemDto,
        @SessionUser() session: Session,
    ) {
        const shoppingItem = await this.service.update(data, session.sub)
        return {
            success: true,
            message: 'Shopping item updated successfully',
            data: shoppingItem,
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @SessionUser() session: Session,
    ) {
        await this.service.delete(id, session.sub)
        return {
            success: true,
            message: 'Task deleted successfully',
        }
    }
}
