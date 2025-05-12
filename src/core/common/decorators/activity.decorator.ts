import { SetMetadata } from '@nestjs/common'
import { ActivityType, EntityType } from 'generated/client'

export const LogActivity = (type: ActivityType, entityType: EntityType) =>
    SetMetadata('activity', { type, entityType })
