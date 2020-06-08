import { Module } from '@nestjs/common'
import { HelloWorldModule } from '@island.is/api/domains/hello-world'

@Module({
  imports: [HelloWorldModule],
})
export class AppModule {}
