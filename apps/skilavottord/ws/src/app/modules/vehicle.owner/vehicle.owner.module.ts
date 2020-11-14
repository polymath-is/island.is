import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { RecyclingRequestModel } from '../recycling.request/model'
import { VehicleModel } from '../vehicle/model'
import { VehicleOwnerModel } from './model'
import { VehicleOwnerResolver } from './vehicle.owner.resolver'
import { VehicleOwnerService } from './vehicle.owner.service'

@Module({
  imports: [
    SequelizeModule.forFeature([
      VehicleOwnerModel,
      VehicleModel,
      RecyclingRequestModel,
    ]),
  ],
  providers: [VehicleOwnerResolver, VehicleOwnerService],
})
export class VehicleOwnerModule {}
