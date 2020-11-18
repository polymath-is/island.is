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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import {
  DokobitError,
  SigningServiceResponse,
} from '@island.is/dokobit-signing'
import { CaseState } from '@island.is/judicial-system/types'
import { GdprModel } from './model/gdpr.model'
import { GdprService } from './gdpr.service'

@Controller('api')
export class GdprController {
  constructor(private readonly gdprService: GdprService) {}

  /*
   *
   */
  //@ApiOkResponse({ type: GdprModel })
  @Get('private/gdprs/')
  async gdprs(): Promise<GdprModel[]> {
    console.log('do gdprs...')
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
