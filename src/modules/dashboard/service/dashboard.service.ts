import { Injectable } from '@nestjs/common'
import { NoteService } from '../../note/service/note.service'
import { ShoppingItemService } from '../../shopping-item/service/shopping-item.service'
import { TaskService } from 'src/modules/task/service/task.service'
@Injectable()
export class DashboardService {
    constructor(
        private readonly taskService: TaskService,
        private readonly noteService: NoteService,
        private readonly shoppingItemService: ShoppingItemService,
    ) {}

    async getDashboardSummary(userId: number) {
        const [tasks, notes, shoppingItems] = await Promise.all([
            this.taskService.getAll(userId),
            this.noteService.getAll(userId),
            this.shoppingItemService.getAll(userId),
        ])

        const activeTasks = tasks.filter((task) => !task.completed).length
        const totalTasks = tasks.length
        const completedTasksPercent = totalTasks
            ? Math.round(((totalTasks - activeTasks) / totalTasks) * 100)
            : 0

        const purchasedItems = shoppingItems.filter(
            (item) => item.purchased,
        ).length
        const totalItems = shoppingItems.length
        const purchasedItemsPercent = totalItems
            ? Math.round((purchasedItems / totalItems) * 100)
            : 0

        return {
            tasks: {
                active: activeTasks,
                total: totalTasks,
                completedPercent: completedTasksPercent,
            },
            notes: {
                total: notes.length,
            },
            shoppingItems: {
                purchased: purchasedItems,
                total: totalItems,
                purchasedPercent: purchasedItemsPercent,
            },
        }
    }
}
