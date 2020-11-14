import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './sequelizeConfig.service'
import {
  AuthModule,
  UserModule,
  GdprDbModule,
  RecyclingPartnerDbModule,
  VehicleModule,
  RecyclingRequestModule,
  VehicleOwnerModule,
  SamgongustofaModule,
  FjarsyslaModule,
} from './modules'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'
const autoSchemaFile = debug ? 'apps/skilavottord/ws/src/app/api.graphql' : true

/*
 * When adding new resolvers through your modules don't forget to add them to buildSchema.ts as well.
 * So the automatically generated schemas won't be failing when running.
 */
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile,
      path: '/api/graphql',
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    AuthModule,
    UserModule,
    SamgongustofaModule,
    FjarsyslaModule,
    GdprDbModule,
    RecyclingPartnerDbModule,
    VehicleModule,
    RecyclingRequestModule,
    VehicleOwnerModule,
  ],
  //providers: [BackendAPI],
})
export class AppModule {}
