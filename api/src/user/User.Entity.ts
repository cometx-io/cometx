import { Authorized, Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { Lazy } from '@/Lazy'
import { Post } from '@/post/Post.Entity'
import { PostRocket } from '@/post/PostRocket.Entity'
import { CommentRocket } from '@/comment/CommentRocket.Entity'
import { UserProfile } from '@/user/data/UserProfile'
import { UserSettings } from '@/user/data/UserSettings'
import { PlanetUser } from '@/planet/PlanetUser.Entity'
import { PlanetModerator } from '@/moderation/PlanetModerator.Entity'
import { PlanetMute } from '@/filter/PlanetMute.Entity'
import { Save } from '@/folder/Save.Entity'
import { UserBlock } from '@/filter/UserBlock.Entity'
import { UserFollow } from '@/user/UserFollow.Entity'
import { PostHide } from '@/filter/PostHide.Entity'
import { Ban } from '@/moderation/Ban.Entity'
import { PlanetAllowedPoster } from '@/planet/PlanetAllowedPoster.Entity'
import dayjs from 'dayjs'
import { UserBadges } from '@/user/data/UserBadges'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  readonly id: number

  @Field()
  get id36(): string {
    return BigInt(this.id).toString(36)
  }

  @Field()
  @Column()
  username: string

  @Authorized('USER')
  @Field()
  @Column({ nullable: true })
  email?: string

  @Authorized('USER')
  @Field()
  @Column('jsonb', {
    default: new UserSettings(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as UserSettings
        } catch {
          return value
        }
      }
    }
  })
  settings: UserSettings

  @Field()
  @Column('jsonb', {
    default: new UserProfile(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as UserProfile
        } catch {
          return value
        }
      }
    }
  })
  profile: UserProfile

  @Field()
  @Column('jsonb', {
    default: new UserBadges(),
    transformer: {
      to: value => value,
      from: value => {
        try {
          return JSON.parse(value) as UserBadges
        } catch {
          return value
        }
      }
    }
  })
  badges: UserBadges

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Authorized()
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date

  @Field()
  online: boolean

  @Column()
  passwordHash: string

  @Column({ default: false })
  deleted: boolean

  // @Authorized('ADMIN')
  @Field()
  @Column({ default: false })
  admin: boolean

  @OneToMany(() => Comment, comment => comment.author)
  comments: Lazy<Comment[]>

  @OneToMany(() => Post, post => post.author)
  posts: Lazy<Post[]>

  @OneToMany(() => PlanetUser, planet => planet.user)
  planets: Lazy<PlanetUser[]>

  @OneToMany(() => PlanetModerator, moderator => moderator.user)
  moderatedPlanets: Lazy<PlanetModerator[]>

  @OneToMany(() => PlanetAllowedPoster, a => a.user)
  allowedPlanets: Lazy<PlanetAllowedPoster[]>

  @OneToMany(() => Ban, ban => ban.user)
  bans: Lazy<Ban[]>

  @OneToMany(() => PlanetMute, mute => mute.user)
  mutedPlanets: Lazy<PlanetMute[]>

  @OneToMany(() => Save, post => post.user)
  saves: Lazy<Save[]>

  @OneToMany(() => PostHide, hide => hide.user)
  hiddenPosts: Lazy<PostHide[]>

  @ManyToOne(() => UserBlock, block => block.from)
  blockTo: Lazy<UserBlock[]>

  @ManyToOne(() => UserBlock, block => block.to)
  blockFrom: Lazy<UserBlock[]>

  @ManyToOne(() => UserFollow, follow => follow.from)
  followTo: Lazy<UserFollow[]>

  @ManyToOne(() => UserFollow, follow => follow.to)
  followFrom: Lazy<UserFollow[]>

  @Field()
  following: boolean

  @Field()
  followed: boolean

  @Field()
  isCurrentUser: boolean

  @Field(() => Int)
  @Column({ default: 0 })
  followerCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  followingCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number

  @Field(() => Int)
  @Column({ default: 0 })
  postCount: number

  @OneToMany(() => PostRocket, rocket => rocket.user)
  postRockets: Lazy<PostRocket[]>

  @OneToMany(() => CommentRocket, rocket => rocket.user)
  commentRockets: Lazy<CommentRocket[]>

  @Field(() => Int)
  @Column({ default: 0 })
  rocketCount: number

  /**
   * Current user is blocked by this user
   */
  @Field()
  blocked: boolean

  /**
   * Current user is blocking this user
   */
  @Field()
  blocking: boolean

  @Field()
  get timeSinceCreated(): string {
    // @ts-ignore
    return dayjs(new Date(this.createdAt)).twitter()
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string
}
