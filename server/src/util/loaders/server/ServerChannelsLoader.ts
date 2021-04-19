import DataLoader from 'dataloader'
import { Channel, Server } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverChannelsLoader = (em: EntityManager) => {
  return new DataLoader<string, Channel[]>(async (serverIds: string[]) => {
    const channels = await em.find(
      Channel,
      { server: serverIds },
      { orderBy: { position: 'DESC' } }
    )
    const map: Record<string, Channel[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = channels.filter(
          channel => channel.server === em.getReference(Server, serverId)
        ))
    )
    return serverIds.map(serverId => map[serverId])
  })
}
