import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateShoppingItemDto } from '../dto/create-shopping-item.dto'
import { ShoppingItemRepository } from '../repository/shopping-item.repository'
import { UserService } from '../../user/service/user.service'
import { FilterShoppingItemDto } from '../dto/filter-shopping.item.dto'
import { UpdateShoppingItemDto } from '../dto/update-shopping-item.dto'
import { ShoppingItem } from 'generated/client'

@Injectable()
export class ShoppingItemService {
    constructor(
        private readonly repository: ShoppingItemRepository,
        private readonly userService: UserService,
    ) {}
    async create(createShoppingItemDto: CreateShoppingItemDto, userId: number) {
        const user = await this.userService.findById(userId)
        return this.repository.create({
            name: createShoppingItemDto.name,
            quantity: createShoppingItemDto.quantity,
            unit: createShoppingItemDto.unit,
            category: createShoppingItemDto.category,
            purchased: false,
            user: {
                connect: {
                    id: user.id,
                },
            },
        })
    }

    async findByFilters(params: FilterShoppingItemDto, userId: number) {
        return this.repository.findByFilters(params, userId)
    }

    async update(data: UpdateShoppingItemDto, userId: number) {
        const shoppingItem = await this.repository.findByUserAndId(
            data.id,
            userId,
        )
        if (!shoppingItem)
            throw new NotFoundException('Shopping item not found')
        return this.repository.update(shoppingItem.id, data)
    }

    async delete(id: number, userId: number) {
        const shoppingItem = await this.repository.findByUserAndId(id, userId)
        if (!shoppingItem)
            throw new NotFoundException('Shopping item not found')
        return this.repository.delete(shoppingItem.id)
    }

    async getAll(userId: number): Promise<ShoppingItem[]> {
        return this.repository.getAll(userId)
    }
}
