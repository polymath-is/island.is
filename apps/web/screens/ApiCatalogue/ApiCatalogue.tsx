import React from 'react'
import { Screen } from '@island.is/web/types'

import { GetNamespaceQuery } from '@island.is/web/graphql/schema'
import { GET_NAMESPACE_QUERY } from '../queries'

import { withMainLayout } from '@island.is/web/layouts/main'
import getConfig from 'next/config'
import { CustomNextError } from '@island.is/web/units/errors'
import { ApiService, GetOpenApiInput } from '@island.is/api/schema'
import { ServiceListContainer } from 'apps/web/components/ServiceListContainer/ServiceListContainer'

const { publicRuntimeConfig } = getConfig()

/* TEMPORARY LAYOUT CREATED TO SCAFFOLD API CATALOGUE INTO THE WEB */

interface ApiCatalogueProps {
  title: string
}

const ApiCatalogue: Screen<ApiCatalogueProps> = ({ title }) => {
  const { disableApiCatalog: disablePage } = publicRuntimeConfig

  if (disablePage === 'true') {
    throw new CustomNextError(404, 'Not found')
  }

  return (
    <div>
      <h1> - {title} - </h1>
      <ServiceListContainer
        services={[
          {
            id: 'bf6b604391414fa99cb43559dad25998',
            name: 'Swagger Petstore - OpenAPI 3.0',
            owner: 'island-is-protected',
            description:
              "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n\nSome useful links:\n- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)",
            pricing: [],
            data: [],
            access: ['xroad'],
            type: ['rest'],
            xroadIdentifier: [
              {
                instance: 'IS-DEV',
                memberClass: 'GOV',
                memberCode: '10000',
                subsystemCode: 'island-is-protected',
                serviceCode: 'petstore-v1',
              },
            ],
          },
          {
            id: '458597c5682a40748b14cac5a274b5a9',
            name: 'National Registry - Demo',
            owner: 'Stafrænt Ísland',
            description:
              'Provides access to an example service that retrieves individuals',
            pricing: ['free'],
            data: ['personal', 'official'],
            access: ['xroad'],
            type: ['rest'],
            xroadIdentifier: [
              {
                instance: 'IS-DEV',
                memberClass: 'GOV',
                memberCode: '10000',
                subsystemCode: 'island-is-protected',
                serviceCode: 'thjodskra-vSaevarma',
              },
            ],
          },
          {
            id: '0c7862e8613b4a328a4cb711df1bdc01',
            name: 'Petstore',
            owner: 'Origo',
            description:
              "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!",
            pricing: ['free'],
            data: ['public', 'health', 'official'],
            access: ['xroad'],
            type: ['rest'],
            xroadIdentifier: [
              {
                instance: 'IS-DEV',
                memberClass: 'COM',
                memberCode: '10002',
                subsystemCode: 'Origo-Protected',
                serviceCode: 'petstore-v1',
              },
              {
                instance: 'IS-DEV',
                memberClass: 'COM',
                memberCode: '10002',
                subsystemCode: 'Origo-Protected',
                serviceCode: 'petstore-v2',
              },
            ],
          },
        ]}
      />
    </div>
  )
}

ApiCatalogue.getInitialProps = async ({ apolloClient, locale, query }) => {
  // const [staticContent, filterContent] = await Promise.all([
  //   apolloClient
  //     .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
  //       query: GET_NAMESPACE_QUERY,
  //       variables: {
  //         input: {
  //           namespace: 'ApiCatalog',
  //           lang: locale,
  //         },
  //       },
  //     })
  //     .then((res) => JSON.parse(res.data.getNamespace.fields)),
  //     apolloClient
  //     .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
  //       query: GET_NAMESPACE_QUERY,
  //       variables: {
  //         input: {
  //           namespace: 'ApiCatalogFilter',
  //           lang: locale,
  //         },
  //       },
  //     })
  //     .then((res) => JSON.parse(res.data.getNamespace.fields)),
  // ])
  // console.log("filterContent");
  // console.log(filterContent);
  // console.log(Object.keys(filterContent));

  return {
    title: 'Vörulisti Vefþjónusta',
  }
}

export default withMainLayout(ApiCatalogue)
