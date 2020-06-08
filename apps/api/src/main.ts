import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { logger } from '@island.is/logging'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'graphql'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 4444
  await app.listen(port, () => {
    logger.info('Listening at http://localhost:' + port + '/' + globalPrefix)
  })
}

bootstrap()
