import React, { useState } from 'react'
import { Screen } from '@island.is/web/types'

import { GetNamespaceQuery } from '@island.is/web/graphql/schema'
import {
  GetApiCatalogueInput,
  Query,
  QueryGetApiCatalogueArgs,
  QueryGetNamespaceArgs,
} from '@island.is/api/schema'

import { GET_NAMESPACE_QUERY } from '../queries'
import { useQuery } from 'react-apollo'
import { GET_CATALOGUE_QUERY } from '../queries/ApiCatalogue'

import { withMainLayout } from '@island.is/web/layouts/main'
import getConfig from 'next/config'
import { CustomNextError } from '@island.is/web/units/errors'
import { ApiService, GetOpenApiInput } from '@island.is/api/schema'
import { ServiceListContainer } from 'apps/web/components/ServiceListContainer/ServiceListContainer'
import {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
} from '@apollo/client'

const { publicRuntimeConfig } = getConfig()

/* TEMPORARY LAYOUT CREATED TO SCAFFOLD API CATALOGUE INTO THE WEB */

interface ApiCatalogueProps {
  title: string
  data: Query
  loading: boolean
  error: ApolloError
}

const LIMIT = 3

const ApiCatalogue: Screen<ApiCatalogueProps> = ({
  title,
  data,
  loading,
  error,
}) => {
  // const { disableApiCatalog: disablePage } = publicRuntimeConfig

  // if (disablePage === 'true') {
  //   throw new CustomNextError(404, 'Not found')
  // }

  //const TEXT_NOT_FOUND = n('notFound')
  //const HEADING_ERROR = n('errorHeading')
  //const TEXT_ERROR = n('errorText')
  //const TEXT_LOAD_MORE = n('fmButton')
  const TEXT_NOT_FOUND = 'Ekkert fannst'
  const HEADING_ERROR = 'Villa átti sér stað'
  const TEXT_ERROR = 'Vinsamlegast reyndu aftur.'
  const TEXT_LOAD_MORE = 'Sjá fleiri'

  // const translateTags = (): TagDisplayNames => {
  //   const names: TagDisplayNames = {
  //     APIGW: fn('accessApigw'),
  //     XROAD: fn('accessXroad'),
  //     FINANCIAL: fn('dataFinancial'),
  //     HEALTH: fn('dataHealth'),
  //     OFFICIAL: fn('dataOfficial'),
  //     PERSONAL: fn('dataPersonal'),
  //     PUBLIC: fn('dataPublic'),
  //     FREE: fn('pricingFree'),
  //     PAID: fn('pricingPaid'),
  //     GRAPHQL: fn('typeGraphql'),
  //     REST: fn('typeRest'),
  //     SOAP: fn('typeSoap'),
  //     OPEN: 'OPEN', //tag not currently used
  //   }

  //   return names
  // }

  // const [parameters, setParameters] = useState<GetApiCatalogueInput>({
  //   cursor: null,
  //   limit: LIMIT,
  //   query: '',
  //   pricing: [],
  //   data: [],
  //   type: [],
  //   access: [],
  // })

  // const { data, loading, error, fetchMore, refetch } = useQuery<Query, QueryGetApiCatalogueArgs>(GET_CATALOGUE_QUERY,
  //   {
  //     variables: {
  //       input: parameters,
  //     },
  //   })

  // const onLoadMore = () => {
  //     if (data?.getApiCatalogue.pageInfo?.nextCursor == null) {
  //       return
  //     }

  //     const { nextCursor } = data?.getApiCatalogue?.pageInfo
  //     const param = { ...parameters, cursor: nextCursor }
  //     fetchMore({
  //       variables: { input: param },
  //       updateQuery: (prevResult, { fetchMoreResult }) => {
  //         fetchMoreResult.getApiCatalogue.services = [
  //           ...prevResult.getApiCatalogue.services,
  //           ...fetchMoreResult.getApiCatalogue.services,
  //         ]
  //         return fetchMoreResult
  //       },
  //     })
  //   }

  return (
    <div>
      <h1>{title}</h1>
      <ServiceListContainer
        services={data?.getApiCatalogue.services}
        span={['12/12', '12/12', '12/12', '6/12', '4/12']}
        loading={loading}
        moreToLoad={data?.getApiCatalogue?.pageInfo?.nextCursor != null}
        emptyListText={TEXT_NOT_FOUND}
        errorMessage={
          error ? { heading: HEADING_ERROR, text: TEXT_ERROR } : undefined
        }
        loadMoreButtonText={TEXT_LOAD_MORE}
        // tagDisplayNames={translateTags()}
        // onLoadMoreClick={onLoadMore}
      />
      {/* <ServiceListContainer
        services={[
          { id: 'bf6b604391414fa99cb43559dad25998', name: 'Swagger Petstore - OpenAPI 3.0', owner: 'island-is-protected', description: "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n\nSome useful links:\n- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)",
            pricing: [],
            data: [],
            access: ['xroad'],
            type: ['rest'],
            xroadIdentifier: [{instance: 'IS-DEV',memberClass: 'GOV',memberCode: '10000',subsystemCode: 'island-is-protected',serviceCode: 'petstore-v1',},],
          },
          { id: '458597c5682a40748b14cac5a274b5a9',name: 'National Registry - Demo',owner: 'Stafrænt Ísland',description:  'Provides access to an example service that retrieves individuals',
            pricing: ['free'],data: ['personal', 'official'],access: ['xroad'],type: ['rest'],
            xroadIdentifier: [{instance: 'IS-DEV',memberClass: 'GOV',memberCode: '10000',subsystemCode: 'island-is-protected',serviceCode: 'thjodskra-vSaevarma',},],
          },
          { id: '0c7862e8613b4a328a4cb711df1bdc01',name: 'Petstore',owner: 'Origo',description:"This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!",
            pricing: ['free'],data: ['public', 'health', 'official'],access: ['xroad'],type: ['rest'],
            xroadIdentifier: [{instance: 'IS-DEV',memberClass: 'COM',memberCode: '10002',subsystemCode: 'Origo-Protected',serviceCode: 'petstore-v1',},{instance: 'IS-DEV',memberClass: 'COM',memberCode: '10002',subsystemCode: 'Origo-Protected',serviceCode: 'petstore-v2',},],
          },
        ]}
      />
      <pre>{JSON.stringify(data?.getApiCatalogue?.services)}</pre> */}
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

  const { data, loading, error, fetchMore, refetch } = 
    await apolloClient.query<Query, QueryGetApiCatalogueArgs >({
      query: GET_CATALOGUE_QUERY,
      variables: {
        input: {
          cursor: null,
          limit: LIMIT,
          query: '',
          pricing: [],
          data: [],
          type: [],
          access: [],
        },
      },
    })
  console.log("data")
  console.log(data?.getApiCatalogue.services)
   console.log(loading)
   console.log(error)
  console.log('date', Date())
  return {
    title: 'Vörulisti Vefþjónusta',
    data: data,
    loading,
    error
  }
}

export default withMainLayout(ApiCatalogue)
