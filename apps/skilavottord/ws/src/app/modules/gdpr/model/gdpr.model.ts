import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GdprModel {
  @Field()
  nationalId: string

  @Field()
  gdprStatus: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
