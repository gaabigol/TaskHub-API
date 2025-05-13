export class EntityMetadataHelper {
    public static getEntityTitle(
        entityType: 'TASK' | 'SHOPPING_ITEM' | 'NOTE',
        entityData: 'title' | 'name',
    ): string | null {
        const titleFieldMap: Record<string, string> = {
            TASK: 'title',
            SHOPPING_ITEM: 'name',
            NOTE: 'title',
        }

        const fieldName = titleFieldMap[entityType]
        if (fieldName && entityData[fieldName]) {
            return entityData[fieldName]
        }

        return null
    }
}
