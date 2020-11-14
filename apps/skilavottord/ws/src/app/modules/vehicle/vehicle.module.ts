import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { VehicleModel } from './model'
import { VehicleService } from './vehicle.service'
import { VehicleResolver } from './vehicle.resolver'
import { RecyclingRequestModel } from '../recycling.request/model'
import { RecyclingPartnerModel } from '../recycling.partner/model'

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
