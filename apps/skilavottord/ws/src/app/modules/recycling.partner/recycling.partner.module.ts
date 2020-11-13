import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { RecyclingRequestModel } from '../recycling.request/model/recycling.request.model'
import { RecyclingPartnerModel } from './'
import { RecyclingPartnerResolver } from './'
import { RecyclingPartnerService } from './'

@Module({
  imports: [
    SequelizeModule.forFeature([RecyclingPartnerModel, RecyclingRequestModel]),
  ],
  providers: [RecyclingPartnerResolver, RecyclingPartnerService],
  exports: [RecyclingPartnerService],
})
export class RecyclingPartnerDbModule {}
