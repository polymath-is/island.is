import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IGroupedMenu } from '../generated/contentfulTypes'
import { Menu, mapMenu } from './menu.model'

@ObjectType()
export class GroupedMenu {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [Menu])
  menus: Menu[]
}

export const mapGroupedMenu = ({ sys, fields }: IGroupedMenu): GroupedMenu => ({
  id: sys.id,
  title: fields.title ?? '',
  menus: (fields.menus ?? []).map(mapMenu),
})
