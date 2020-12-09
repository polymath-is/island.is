import React from 'react'
import { Screen } from '@island.is/web/types'
import { withMainLayout } from '@island.is/web/layouts/main'
import getConfig from 'next/config'
import { CustomNextError } from '@island.is/web/units/errors'

import { GetNamespaceQuery } from '@island.is/web/graphql/schema'
import {
  Query,
  QueryGetApiServiceByIdArgs,
  QueryGetNamespaceArgs,
} from '@island.is/api/schema'
import { GET_NAMESPACE_QUERY } from '../queries'
import { GET_API_SERVICE_QUERY } from '../queries/ApiCatalogue'
import { ApiService } from '@island.is/api/schema'
import { ServiceView } from '../../components/ServiceView/ServiceView'
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client'

const { publicRuntimeConfig } = getConfig()

/* TEMPORARY LAYOUT CREATED TO SCAFFOLD SERVICE DETAILS INTO THE WEB */

interface ServiceDetailsProps {
  title: string
  service: ApiService
  serviceId: string
  strings: GetNamespaceQuery['getNamespace']
}

const ServiceDetails: Screen<ServiceDetailsProps> = ({
  title,
  service,
  serviceId,
  strings,
}) => {
  const { disableApiCatalog: disablePage } = publicRuntimeConfig

  if (disablePage === 'true') {
    throw new CustomNextError(404, 'Not found')
  }

  // const { data, loading, error } = useQuery<Query, QueryGetApiServiceByIdArgs>(GET_API_SERVICE_QUERY, {
  //   variables: {
  //     input: {
  //       id: serviceId,
  //     },
  //   },
  // })

  return (
    <div>
      <h1>{title}</h1>
      <ServiceView strings={strings} service={service} />     
    </div>
  )
}

ServiceDetails.getInitialProps = async ({ apolloClient, locale, query }) => {

  const serviceId = String(query.slug)
  const { data, loading, error } = await apolloClient.query<
    Query,
    QueryGetApiServiceByIdArgs
  >({
    query: GET_API_SERVICE_QUERY,
    variables: {
      input: {
        id: serviceId,
      },
    },
  })
  const service: ApiService = data.getApiServiceById
    ? data.getApiServiceById
    : null

  const [filterContent] = await Promise.all([
    apolloClient
      .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
        query: GET_NAMESPACE_QUERY,
        variables: {
          input: {
            namespace: 'ApiCatalogFilter',
            lang: locale,
          },
        },
      })
      .then((res) => JSON.parse(res.data.getNamespace.fields)),
  ])

  console.log('serviceId: ' + serviceId);
  return {
    title: 'Vefþjónusta - nánari lýsing',
    service: service,
    serviceId:serviceId,
    strings: filterContent
  }
}

export default withMainLayout(ServiceDetails)
