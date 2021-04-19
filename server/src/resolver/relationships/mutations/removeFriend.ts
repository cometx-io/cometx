import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { BlockUserInput } from '@/resolver/relationships/mutations/blockUser'

@InputType()
export class RemoveFriendInput {
  @Field(() => ID)
  userId: string
}

export async function removeFriend(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: BlockUserInput
): Promise<Relationship> {
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (
    !(
      myData.status === RelationshipStatus.Friends &&
      theirData.status === RelationshipStatus.Friends
    )
  )
    throw new Error('Not friends with that user')
  myData.status = RelationshipStatus.None
  theirData.status = RelationshipStatus.None
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
