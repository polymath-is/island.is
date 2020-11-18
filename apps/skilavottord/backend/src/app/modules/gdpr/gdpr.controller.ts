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

@Controller('api')
export class GdprController {
  @Get('getGdpr/')
  private findGdprById() {
    return 'test'
  }
}
