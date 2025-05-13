import { Module } from '@nestjs/common'
import { DashboardController } from './controller/dashboard.controller'
import { DashboardService } from './service/dashboard.service'
import { NoteModule } from '../note/note.module'
import { TaskModule } from '../task/task.module'
import { ShoppingItemModule } from '../shopping-item/shopping-item.module'

@Module({
    imports: [NoteModule, TaskModule, ShoppingItemModule],
    controllers: [DashboardController],
    providers: [DashboardService],
    exports: [DashboardService],
})
export class DashboardModule {}
