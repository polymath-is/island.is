import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { GdprService } from './'
import { GdprModel } from './'
import { GdprResolver } from './'

@Module({
  imports: [SequelizeModule.forFeature([GdprModel])],
  providers: [GdprResolver, GdprService],
})
export class GdprDbModule {}

// @Module({
//   imports: [SequelizeModule.forFeature([GdprModel])],
//   providers: [GdprResolver, GdprService],
//   exports: [GdprService],
// })
// export class GdprModule {}
