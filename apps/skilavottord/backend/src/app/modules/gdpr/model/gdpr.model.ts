import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'

export interface GdprDto {
  nationalId: string
  gdprStatus: string
}

@Table({ tableName: 'gdpr' })
export class GdprModel extends Model<GdprModel> implements GdprDto {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  nationalId: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: true,
  })
  gdprStatus: string

  @CreatedAt
  @Column
  createdAt: Date

  @UpdatedAt
  @Column
  updatedAt: Date
}
