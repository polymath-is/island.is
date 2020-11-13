import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { VehicleModel } from './'
import { VehicleService } from './'
import { VehicleResolver } from './'
import { RecyclingRequestModel } from '../recycling.request/model/recycling.request.model'
import { RecyclingPartnerModel } from '../recycling.partner/model/recycling.partner.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      VehicleModel,
      RecyclingRequestModel,
      RecyclingPartnerModel,
    ]),
  ],
  providers: [VehicleResolver, VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
