import DataLoader from 'dataloader'
import { Relationship, User } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const userUnreadCountLoader = (
  em: EntityManager,
  currentUserId: string
) => {
  return new DataLoader<string, number>(async (userIds: string[]) => {
    const relationships = await em.find(Relationship, {
      owner: currentUserId,
      user: userIds
    })
    const map: Record<string, number> = {}
    userIds.forEach(
      userId =>
        (map[userId] =
          relationships.find(rel => rel.user === em.getReference(User, userId))
            ?.unreadCount ?? 0)
    )
    return userIds.map(userId => map[userId])
  })
}
