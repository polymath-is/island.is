import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { IdentityResource } from './identity-resource.model'

@Table({
  tableName: 'identity_resource_user_claim',
  indexes: [
    {
      fields: ['identity_resource_id', 'claim_name'],
    },
  ],
})
export class IdentityResourceUserClaim extends Model<
  IdentityResourceUserClaim
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ForeignKey(() => IdentityResource)
  @ApiProperty()
  identityResourceName!: string

  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  claimName!: string

  @CreatedAt
  @ApiProperty()
  readonly created!: Date

  @UpdatedAt
  @ApiProperty()
  readonly modified?: Date
}
