import { BaseRepository } from 'src/core/domain/interfaces/base-repository.interface.ts'
import { Prisma, ShoppingItem } from 'generated/client'
import { PrismaService } from 'src/core/infrastructure/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { UpdateShoppingItemDto } from '../dto/update-shopping-item.dto'
import { FilterShoppingItemDto } from '../dto/filter-shopping.item.dto'

@Injectable()
export class ShoppingItemRepository implements BaseRepository<ShoppingItem> {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.ShoppingItemCreateInput): Promise<ShoppingItem> {
        return this.prisma.shoppingItem.create({
            data,
        })
    }
    async findByFilters(
        params: FilterShoppingItemDto,
        userId: number,
    ): Promise<ShoppingItem[]> {
        const where: Prisma.ShoppingItemWhereInput = {}

        if (params.name !== undefined) {
            where.name = {
                contains: params.name,
            }
        }

        if (params.category !== undefined) {
            where.category = params.category
        }

        if (params.purchased !== undefined) {
            where.purchased = params.purchased
        }

        if (params.createdAt !== undefined) {
            where.createdAt = params.createdAt
        }

        return this.prisma.shoppingItem.findMany({
            where: {
                user: {
                    id: userId,
                },
                ...where,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async update(id: number, data: UpdateShoppingItemDto) {
        return this.prisma.shoppingItem.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                quantity: data.quantity,
                unit: data.unit,
                category: data.category,
                purchased: data.purchased,
            },
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.shoppingItem.delete({
            where: {
                id,
            },
        })
    }

    async findById(id: number): Promise<ShoppingItem | null> {
        return await this.prisma.shoppingItem.findUnique({
            where: {
                id,
            },
        })
    }

    async findByUserAndId(
        id: number,
        userId: number,
    ): Promise<ShoppingItem | null> {
        return await this.prisma.shoppingItem.findFirst({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
        })
    }

    async getAll(userId: number): Promise<ShoppingItem[]> {
        return this.prisma.shoppingItem.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }
}
