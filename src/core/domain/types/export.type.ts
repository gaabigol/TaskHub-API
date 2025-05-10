import { Task, Note, ShoppingItem } from 'generated/client'

export type ExportableEntity = Task | Note | ShoppingItem

export type ExportFormat = 'pdf' | 'csv'
