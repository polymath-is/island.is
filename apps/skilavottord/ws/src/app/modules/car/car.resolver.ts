import { Query, Resolver, Args } from '@nestjs/graphql'
import { Car } from './models'
import { CarService } from './models/car.service'
@Resolver(() => Car)
export class CarResolver {
  carService:CarService

  constructor() {
    this.carService = new CarService()
  }

  @Query(() => Car)
  getCarById(@Args('id') nid: string): Car{
    return this.carService.getCarById(nid)
  }
}