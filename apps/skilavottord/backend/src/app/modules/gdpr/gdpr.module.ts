import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { GdprController } from './gdpr.controller'
import { GdprService } from './gdpr.service'
import { GdprModel } from './model/gdpr.model'

@Module({
  imports: [SequelizeModule.forFeature([GdprModel])],
  controllers: [GdprController],
  providers: [GdprService],
})
export class GdprDbModule {}
