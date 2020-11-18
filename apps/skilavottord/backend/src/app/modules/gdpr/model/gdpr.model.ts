import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({ tableName: 'gdpr' })
export class GdprModel extends Model<GdprModel> {
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
