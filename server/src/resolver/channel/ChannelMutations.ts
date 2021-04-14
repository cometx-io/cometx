import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Channel } from '@/entity'
import { CreateChannelInput } from './mutations/createChannel'
import { createChannel } from './mutations/createChannel'
import {
  UpdateChannelInput,
  updateChannel
} from '@/resolver/channel/mutations/updateChannel'

@Resolver()
export class ChannelMutations {
  @Authorized()
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateChannelInput
  ): Promise<Channel> {
    return createChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Channel)
  async updateChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateChannelInput
  ): Promise<Channel> {
    return updateChannel(ctx, input)
  }
}
