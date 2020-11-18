import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import { Gdpr } from '@island.is/skilavottord/types'
import { environment } from '../environments'

@Injectable()
class BackendAPI extends RESTDataSource {
  baseURL = `${environment.backendUrl}/api/private`

  getGdprs(): Promise<Gdpr[]> {
    return this.get(`gdprs`)
  }
}

export default BackendAPI
