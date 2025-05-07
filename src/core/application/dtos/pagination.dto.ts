import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit: number = 10

    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt'

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc'
}
