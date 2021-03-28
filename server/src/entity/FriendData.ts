import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { User } from '@/entity'
import { FriendStatus } from '@/resolver/friend'

@Entity()
export class FriendData {
  @ManyToOne({
    entity: () => User,
    primary: true,
    inversedBy: 'friendData'
  })
  user: User

  @ManyToOne({ entity: () => User, primary: true })
  toUser: User;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property({ nullable: true })
  lastMessageAt?: Date

  @Property({ nullable: true })
  updatedAt?: Date

  @Property()
  showChat: boolean = false

  @Enum({
    items: () => FriendStatus
  })
  status: FriendStatus = FriendStatus.None
}