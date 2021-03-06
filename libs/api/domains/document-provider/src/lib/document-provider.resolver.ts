import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { DocumentProviderService } from './document-provider.service'
import { ClientCredentials, AudienceAndScope, TestResult } from './models'
import {
  RunEndpointTestsInput,
  RegisterEndpointInput,
  RegisterProviderInput,
} from './dto'

//TODO: UseGuards
//TODO: log acting user

@Resolver()
export class DocumentProviderResolver {
  constructor(private documentProviderService: DocumentProviderService) {}

  @Mutation(() => ClientCredentials)
  async registerProvider(
    @Args('input') input: RegisterProviderInput,
  ): Promise<ClientCredentials> {
    return this.documentProviderService.createProviderOnTest(
      input.nationalId,
      input.clientName,
    )
  }

  @Mutation(() => AudienceAndScope)
  async registerEndpoint(
    @Args('input') input: RegisterEndpointInput,
  ): Promise<AudienceAndScope> {
    return this.documentProviderService.updateEndpointOnTest(
      input.nationalId,
      input.endpoint,
      input.providerId,
    )
  }

  @Mutation(() => [TestResult])
  async runEndpointTests(
    @Args('input') input: RunEndpointTestsInput,
  ): Promise<TestResult[]> {
    return this.documentProviderService.runEndpointTests(
      input.nationalId,
      input.recipient,
      input.documentId,
    )
  }

  @Mutation(() => ClientCredentials)
  async createProvider(
    @Args('input') input: RegisterProviderInput,
  ): Promise<ClientCredentials> {
    return this.documentProviderService.createProvider(
      input.nationalId,
      input.clientName,
    )
  }

  @Mutation(() => AudienceAndScope)
  async updateEndpoint(
    @Args('input') input: RegisterEndpointInput,
  ): Promise<AudienceAndScope> {
    return this.documentProviderService.updateEndpoint(
      input.nationalId,
      input.endpoint,
      input.providerId,
    )
  }
}
