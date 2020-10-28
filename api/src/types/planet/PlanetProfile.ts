import { Field, ObjectType } from 'type-graphql'
import { PlanetRule } from '@/types/planet/PlanetRule'

@ObjectType()
export class PlanetProfile {
  @Field({ nullable: true })
  avatarURL?: string

  @Field({ nullable: true })
  bannerURL?: string

  @Field({ nullable: true })
  color?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  customName?: string

  @Field({ nullable: true })
  twitterUsername?: string

  @Field({ nullable: true })
  discordInvite?: string

  @Field(() => [PlanetRule], { nullable: true })
  rules?: PlanetRule[]
}