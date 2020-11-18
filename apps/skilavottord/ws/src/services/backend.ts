import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'

// import { User } from '@island.is/skilavottord-ws/types'
import { environment } from '../environments'

@Injectable()
class BackendAPI extends RESTDataSource {
  baseURL = `${environment.backendUrl}/api/private`

  // getUserFlights(nationalId: string): Promise<Flight[]> {
  //   return this.get(`users/${nationalId}/flights`)
  // }
}

export default BackendAPI
