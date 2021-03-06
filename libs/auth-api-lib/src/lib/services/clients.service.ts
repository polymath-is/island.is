import { Logger, LOGGER_PROVIDER } from '@island.is/logging'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ClientDTO } from '../entities/dto/client.dto'
import { ClientUpdateDTO } from '../entities/dto/client-update.dto'
import { ClientIdpRestrictionDTO } from '../entities/dto/client-idp-restriction.dto'
import { ClientAllowedCorsOrigin } from '../entities/models/client-allowed-cors-origin.model'
import { ClientAllowedScope } from '../entities/models/client-allowed-scope.model'
import { ClientClaim } from '../entities/models/client-claim.model'
import { ClientGrantType } from '../entities/models/client-grant-type.model'
import { ClientIdpRestrictions } from '../entities/models/client-idp-restrictions.model'
import { ClientPostLogoutRedirectUri } from '../entities/models/client-post-logout-redirect-uri.model'
import { ClientRedirectUri } from '../entities/models/client-redirect-uri.model'
import { ClientSecret } from '../entities/models/client-secret.model'
import { Client } from '../entities/models/client.model'
import { ClientAllowedCorsOriginDTO } from '../entities/dto/client-allowed-cors-origin.dto'
import { ClientRedirectUriDTO } from '../entities/dto/client-redirect-uri.dto'
import { ClientGrantTypeDTO } from '../entities/dto/client-grant-type.dto'
import { ClientAllowedScopeDTO } from '../entities/dto/client-allowed-scope.dto'
import { ClientClaimDTO } from '../entities/dto/client-claim.dto'
import { ClientPostLogoutRedirectUriDTO } from '../entities/dto/client-post-logout-redirect-uri.dto'

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(ClientAllowedCorsOrigin)
    private clientAllowedCorsOrigin: typeof ClientAllowedCorsOrigin,
    @InjectModel(ClientIdpRestrictions)
    private clientIdpRestriction: typeof ClientIdpRestrictions,
    @InjectModel(ClientSecret)
    private clientSecret: typeof ClientSecret,
    @InjectModel(ClientRedirectUri)
    private clientRedirectUri: typeof ClientRedirectUri,
    @InjectModel(ClientGrantType)
    private clientGrantType: typeof ClientGrantType,
    @InjectModel(ClientAllowedScope)
    private clientAllowedScope: typeof ClientAllowedScope,
    @InjectModel(ClientClaim)
    private clientClaim: typeof ClientClaim,
    @InjectModel(ClientPostLogoutRedirectUri)
    private clientPostLogoutUri: typeof ClientPostLogoutRedirectUri,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  /** Gets all clients */
  async findAll(): Promise<Client[] | null> {
    return this.clientModel.findAll({
      include: [
        ClientAllowedScope,
        ClientAllowedCorsOrigin,
        ClientRedirectUri,
        ClientIdpRestrictions,
        ClientSecret,
        ClientPostLogoutRedirectUri,
        ClientGrantType,
        ClientClaim,
      ],
    })
  }

  /** Gets all clients with paging */
  async findAndCountAll(
    page: number,
    count: number,
  ): Promise<{ rows: Client[]; count: number } | null> {
    page--
    const offset = page * count
    return this.clientModel.findAndCountAll({
      limit: count,
      offset: offset,
      distinct: true,
    })
  }

  /** Gets a client by it's id */
  async findClientById(id: string): Promise<Client | null> {
    this.logger.debug(`Finding client for id - "${id}"`)

    if (!id) {
      throw new BadRequestException('Id must be provided')
    }

    const client = await this.clientModel.findByPk(id, { raw: true })

    if (client) {
      await this.findAssociations(client)
        .then<any, never>((result: any) => {
          client.allowedScopes = result[0]
          client.allowedCorsOrigins = result[1]
          client.redirectUris = result[2]
          client.identityProviderRestrictions = result[3]
          client.clientSecrets = result[4]
          client.postLogoutRedirectUris = result[5]
          client.allowedGrantTypes = result[6]
          client.claims = result[7]
        })
        .catch((error) =>
          this.logger.error(`Error in findAssociations: ${error}`),
        )
    }

    return client
  }

  /** Gets all associations for Client */
  private findAssociations(client: Client): Promise<any> {
    return Promise.all([
      this.clientAllowedScope.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 0
      this.clientAllowedCorsOrigin.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 1
      this.clientRedirectUri.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 2
      this.clientIdpRestriction.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 3
      this.clientSecret.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 4
      this.clientPostLogoutUri.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 5
      this.clientGrantType.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 6
      this.clientClaim.findAll({
        where: { clientId: client.clientId },
        raw: true,
      }), // 7
    ])
  }

  /** Creates a new client */
  async create(client: ClientDTO): Promise<Client> {
    this.logger.debug('Creating a new client')

    return await this.clientModel.create({ ...client })
  }

  /** Updates an existing client */
  async update(client: ClientUpdateDTO, id: string): Promise<Client | null> {
    this.logger.debug('Updating client with id: ', id)

    if (!id) {
      throw new BadRequestException('id must be provided')
    }

    await this.clientModel.update(
      { ...client },
      {
        where: { clientId: id },
      },
    )

    return await this.findClientById(id)
  }

  /** Deletes a client by id */
  async delete(id: string): Promise<number> {
    this.logger.debug('Deleting client with id: ', id)

    if (!id) {
      throw new BadRequestException('id must be provided')
    }

    // Delete associations
    await this.clientAllowedCorsOrigin.destroy({
      where: { clientId: id },
    })

    await this.clientIdpRestriction.destroy({
      where: { clientId: id },
    })

    await this.clientRedirectUri.destroy({
      where: { clientId: id },
    })

    await this.clientSecret.destroy({
      where: { clientId: id },
    })

    await this.clientPostLogoutUri.destroy({
      where: { clientId: id },
    })

    await this.clientGrantType.destroy({
      where: { clientId: id },
    })

    // Delete Client
    return await this.clientModel.destroy({
      where: { clientId: id },
    })
  }

  /** Finds allowed cors origins by origin */
  async findAllowedCorsOrigins(
    origin: string,
  ): Promise<ClientAllowedCorsOrigin[]> {
    this.logger.debug(
      `Finding client allowed CORS origins for origin - "${origin}"`,
    )

    if (!origin) {
      throw new BadRequestException('Origin must be provided')
    }

    return this.clientAllowedCorsOrigin.findAll({
      where: { origin: origin },
    })
  }

  /** Adds IDP restriction to client */
  async addIdpRestriction(
    clientIdpRestriction: ClientIdpRestrictionDTO,
  ): Promise<ClientIdpRestrictions> {
    this.logger.debug(
      `Creating IDP restriction for client - "${clientIdpRestriction.clientId}" with restriction - "${clientIdpRestriction.name}"`,
    )

    if (!clientIdpRestriction) {
      throw new BadRequestException('ClientIdpRestriction must be provided')
    }

    return await this.clientIdpRestriction.create({ ...clientIdpRestriction })
  }

  /** Removes an IDP restriction for a client */
  async removeIdpRestriction(clientId: string, name: string): Promise<number> {
    this.logger.debug(
      `Removing IDP restriction for client - "${clientId}" with restriction - "${name}"`,
    )

    if (!name || !clientId) {
      throw new BadRequestException(
        'IdpRestriction and clientId must be provided',
      )
    }

    return await this.clientIdpRestriction.destroy({
      where: { clientId: clientId, name: name },
    })
  }

  /** Adds Allowed CORS origin for client */
  async addAllowedCorsOrigin(
    corsOrigin: ClientAllowedCorsOriginDTO,
  ): Promise<ClientAllowedCorsOrigin> {
    this.logger.debug(
      `Adding allowed cors origin for client - "${corsOrigin.clientId}" with origin - "${corsOrigin.origin}"`,
    )

    if (!corsOrigin) {
      throw new BadRequestException('Cors origin object must be provided')
    }

    return await this.clientAllowedCorsOrigin.create({ ...corsOrigin })
  }

  /** Removes an allowed cors origin for client */
  async removeAllowedCorsOrigin(
    clientId: string,
    origin: string,
  ): Promise<number> {
    this.logger.debug(
      `Removing cors origin for client - "${clientId}" with origin - "${origin}"`,
    )

    if (!clientId || !origin) {
      throw new BadRequestException('origin and clientId must be provided')
    }

    return await this.clientAllowedCorsOrigin.destroy({
      where: { clientId: clientId, origin: origin },
    })
  }

  /** Adds an redirect uri for client */
  async addRedirectUri(
    redirectObject: ClientRedirectUriDTO,
  ): Promise<ClientRedirectUri> {
    this.logger.debug(
      `Adding redirect uri for client - "${redirectObject.clientId}" with uri - "${redirectObject.redirectUri}"`,
    )

    if (!redirectObject) {
      throw new BadRequestException('Redirect object must be provided')
    }

    return await this.clientRedirectUri.create({ ...redirectObject })
  }

  /** Removes an redirect uri for client */
  async removeRedirectUri(
    clientId: string,
    redirectUri: string,
  ): Promise<number> {
    this.logger.debug(
      `Removing redirect uri for client - "${clientId}" with uri - "${redirectUri}"`,
    )

    if (!clientId || !redirectUri) {
      throw new BadRequestException('redirectUri and clientId must be provided')
    }

    return await this.clientRedirectUri.destroy({
      where: { clientId: clientId, redirectUri: redirectUri },
    })
  }

  /** Adds a grant type to client */
  async addGrantType(
    grantTypeObj: ClientGrantTypeDTO,
  ): Promise<ClientGrantType> {
    this.logger.debug(
      `Adding grant type - "${grantTypeObj.grantType}" to client - "${grantTypeObj.clientId}"`,
    )

    if (!grantTypeObj) {
      throw new BadRequestException('Grant Type object must be provided')
    }

    return await this.clientGrantType.create({ ...grantTypeObj })
  }

  /** Removes a grant type for client */
  async removeGrantType(clientId: string, grantType: string): Promise<number> {
    this.logger.debug(
      `Removing grant type "${grantType}" for client - "${clientId}"`,
    )

    if (!clientId || !grantType) {
      throw new BadRequestException('grantType and clientId must be provided')
    }

    return await this.clientGrantType.destroy({
      where: { clientId: clientId, grantType: grantType },
    })
  }

  /** Adds an allowed scope to client */
  async addAllowedScope(
    clientAllowedScope: ClientAllowedScopeDTO,
  ): Promise<ClientAllowedScope> {
    this.logger.debug(
      `Adding allowed scope - "${clientAllowedScope.scopeName}" to client - "${clientAllowedScope.clientId}"`,
    )

    if (!clientAllowedScope) {
      throw new BadRequestException(
        'clientAllowedScope object must be provided',
      )
    }

    return await this.clientAllowedScope.create({ ...clientAllowedScope })
  }

  /** Removes an allowed scope from client */
  async removeAllowedScope(
    clientId: string,
    scopeName: string,
  ): Promise<number> {
    this.logger.debug(
      `Removing scope - "${scopeName}" from client - "${clientId}"`,
    )

    if (!clientId || !scopeName) {
      throw new BadRequestException('scopeName and clientId must be provided')
    }

    return await this.clientAllowedScope.destroy({
      where: { clientId: clientId, scopeName: scopeName },
    })
  }

  /** Adds an claim to client */
  async addClaim(claim: ClientClaimDTO): Promise<ClientClaim> {
    this.logger.debug(
      `Adding claim of type - "${claim.type}", with value - "${claim.value}" to client - "${claim.clientId}"`,
    )

    if (!claim) {
      throw new BadRequestException('claim object must be provided')
    }

    return await this.clientClaim.create({ ...claim })
  }

  /** Removes an claim from client */
  async removeClaim(
    clientId: string,
    claimType: string,
    claimValue: string,
  ): Promise<number> {
    this.logger.debug(
      `Removing claim of type - "${claimType}", with value - "${claimValue}" from client - "${clientId}"`,
    )

    if (!clientId || !claimType || !claimValue) {
      throw new BadRequestException(
        'claimType, claimValue and clientId must be provided',
      )
    }

    return await this.clientClaim.destroy({
      where: { clientId: clientId, type: claimType, value: claimValue },
    })
  }

  /** Adds an post logout uri to client */
  async addPostLogoutRedirectUri(
    postLogoutUri: ClientPostLogoutRedirectUriDTO,
  ): Promise<ClientPostLogoutRedirectUri> {
    this.logger.debug(
      `Adding post logout uri - "${postLogoutUri.redirectUri}", to client - "${postLogoutUri.clientId}"`,
    )

    if (!postLogoutUri) {
      throw new BadRequestException('postLogoutUri object must be provided')
    }

    return await this.clientPostLogoutUri.create({ ...postLogoutUri })
  }

  /** Removes an post logout uri from client */
  async removePostLogoutRedirectUri(
    clientId: string,
    redirectUri: string,
  ): Promise<number> {
    this.logger.debug(
      `Removing post logout uri - "${redirectUri}" from client - "${clientId}"`,
    )

    if (!clientId || !redirectUri) {
      throw new BadRequestException('clientId and uri must be provided')
    }

    return await this.clientPostLogoutUri.destroy({
      where: { clientId: clientId, redirectUri: redirectUri },
    })
  }
}
