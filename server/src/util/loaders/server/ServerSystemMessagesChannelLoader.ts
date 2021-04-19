import DataLoader from 'dataloader'
import { Channel, Server } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const serverSystemMessagesChannelLoader = (em: EntityManager) => {
  return new DataLoader<string, Channel>(async (serverIds: string[]) => {
    const servers = await em.find(Server, serverIds, ['systemMessagesChannel'])
    const map: Record<string, Channel> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = servers.find(
          server => server === em.getReference(Server, serverId)
        )?.systemMessagesChannel)
    )
    return serverIds.map(serverId => map[serverId])
  })
}
