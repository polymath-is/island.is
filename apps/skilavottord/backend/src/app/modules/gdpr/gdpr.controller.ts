import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Inject,
  ForbiddenException,
  Query,
  ConflictException,
  Res,
} from '@nestjs/common'
import { GdprModel } from './model/gdpr.model'
import { GdprService } from './gdpr.service'
import { Logger, LOGGER_PROVIDER } from '@island.is/logging'

@Controller('api')
export class GdprController {
  constructor(
    private readonly gdprService: GdprService,
    @Inject(LOGGER_PROVIDER) private logger: Logger,
  ) {}

  /*
   *
   */
  //@ApiOkResponse({ type: GdprModel })
  @Get('private/gdprs/')
  async gdprs(): Promise<GdprModel[]> {
    this.logger.info('do gdprs...')
    const gdpr = await this.gdprService.findAll()
    if (!gdpr) {
      throw new NotFoundException(`Gdprs not found`)
    }
    return gdpr
  }

  /*
   *
   */
  @Get('getGdpr/')
  private findGdprById() {
    return 'test'
  }
}
