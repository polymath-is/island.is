import { Module } from '@nestjs/common'
import { AuthModule } from '../auth'
import { GdprResolver } from './gdpr.resolver'

@Module({
  imports: [AuthModule],
  providers: [GdprResolver],
})
export class GdprDbModule {}
