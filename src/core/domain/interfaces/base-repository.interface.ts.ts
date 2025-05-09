import { PaginationDto } from '../../application/dtos/pagination.dto'

export interface BaseRepository<T> {
    create(entity: T): Promise<T>
    update?(id: number, entity: T): Promise<T>
    delete?(id: number): Promise<void>
    findAll?(paginationDto: PaginationDto): Promise<{
        data: T[]
        meta: {
            total: number
            page: number
            limit: number
            lastPage: number
        }
    }>
    findById?(id: number): Promise<T | null>
}
