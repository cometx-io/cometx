import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ChatMessage } from '@/chat/ChatMessage.Entity'
import { Lazy } from '@/Lazy'
import { ChatGroup } from '@/chat/ChatGroup.Entity'
import { Planet } from '@/planet/Planet.Entity'

@ObjectType()
@Entity()
export class ChatChannel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @OneToMany(() => ChatMessage, message => message.channel)
  messages: Lazy<ChatMessage[]>

  @Column({ nullable: true })
  planetId: number

  @ManyToOne(() => Planet, planet => planet.channels, { nullable: true })
  planet: Lazy<Planet>

  @Column({ nullable: true })
  groupId: number

  @OneToOne(() => ChatGroup, group => group.channel, { nullable: true })
  group: Lazy<ChatGroup>
}