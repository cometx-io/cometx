import { Post } from '@/entity'
import { ChangePayload } from '@/subscriptions/ChangePayload'
import { SubscriptionFilter } from '@/subscriptions/filters/SubscriptionFilter'

export async function PostSubscriptionFilter({
  payload: { id },
  context: { user, em }
}: SubscriptionFilter<ChangePayload>): Promise<boolean> {
  const post = await em.findOneOrFail(Post, id)
  return user.hasJoinedServer(em, post.server.id)
}
