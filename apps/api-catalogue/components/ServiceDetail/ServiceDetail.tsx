import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  Box,
  Breadcrumbs,
  Link,
  LoadingIcon,
  Select,
  Text,
} from '@island.is/island-ui/core'
import * as styles from './ServiceDetail.treat'
import cn from 'classnames'
import { ApiService, GetOpenApiInput } from '@island.is/api/schema'
import { useQuery } from 'react-apollo'
import { GET_OPEN_API_QUERY } from '../../screens/Queries'
import { OpenApi } from '@island.is/api-catalogue/types'
import YamlParser from 'js-yaml'
import { OpenApiView } from '../OpenApiView'

import { GetNamespaceQuery } from '../../types'
import { useNamespace } from '../../hooks'
import { capitalize } from '../../utils'

type SelectOption = {
  label: string
  value: any
}

export interface ServiceDetailProps {
  service: ApiService
  strings: GetNamespaceQuery['getNamespace']
}

export const ServiceDetail = ({ service, strings }: ServiceDetailProps) => {
  const n = useNamespace(strings)

  const options: Array<SelectOption> = service.xroadIdentifier.map((x) => ({
    label: x.serviceCode.split('-').pop(),
    value: {
      instance: x.instance,
      memberClass: x.memberClass,
      memberCode: x.memberCode,
      serviceCode: x.serviceCode,
      subsystemCode: x.subsystemCode,
    },
  }))
  const [openApi, setOpenApi] = useState<GetOpenApiInput>(options[0].value)
  const { data, loading } = useQuery(GET_OPEN_API_QUERY, {
    variables: {
      input: openApi,
    },
  })
  const onSelectChange = (option: SelectOption) => {
    setOpenApi(option.value)
  }

  // Main page
  return (
    <Box className={cn(styles.root)}>
      <Breadcrumbs>
        <Link href="https://island.is/">Ísland.is</Link>
        <Link href="https://throun.island.is/">Þróun</Link>
        <Link href="/">Vefjþjónustur</Link>
        <Link href="/services">API Vörulisti</Link>
        <Link href={`/services/${service.id}`}>{service.id}</Link>
      </Breadcrumbs>
      <div className={cn(styles.topSection)}>
        <h1 className="name" data-id={service.id}>
          {service.name}
        </h1>
        <div className={cn(styles.description)}>{service.description}</div>
        <Box>
          <Select
            label="Version"
            name="version"
            defaultValue={options[0]}
            options={options}
            onChange={onSelectChange}
            noOptionsMessage="Engar útgáfuupplýsingar"
          />
        </Box>
      </div>
      <div className={cn(styles.section)}>
        <Box>
          <h3>Framleiðandi</h3>
          <div className={cn(styles.description)}>{service.owner}</div>
        </Box>
      </div>
      <div className={cn(styles.section)}>
        <Box className={cn(styles.categoryContainer)}>
          <Box style={{ width: '100%' }}>
            <h3>{n('pricing')}</h3>
            <div className={cn([styles.category])}>
              {service.pricing?.map((item, index) => (
                <div className={cn(styles.categoryItem)} key={index}>
                  {n(`pricing${capitalize(item)}`)}
                </div>
              ))}
            </div>
          </Box>
          <Box style={{ width: '100%' }}>
            <h3>{n('data')}</h3>
            <div className={cn([styles.category])}>
              {service.data?.map((item, index) => (
                <div className={cn(styles.categoryItem)} key={index}>
                  {n(`data${capitalize(item)}`)}
                </div>
              ))}
            </div>
          </Box>
          <Box style={{ width: '100%' }}>
            <h3>{n('type')}</h3>
            <div className={cn([styles.category])}>
              {service.type?.map((item, index) => (
                <div className={cn(styles.categoryItem)} key={index}>
                  {n(`type${capitalize(item)}`)}
                </div>
              ))}
            </div>
          </Box>
          <Box style={{ width: '100%' }}>
            <h3>{n('access')}</h3>
            <div className={cn([styles.category])}>
              {service.access?.map((item, index) => (
                <div className={cn(styles.categoryItem)} key={index}>
                  {n(`access${capitalize(item)}`)}
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </div>
      <div className={cn(styles.section)}>
        <Accordion singleExpand={true}>
          <AccordionItem id="id_1" label="OpenAPI skjölun">
            <Text variant="default" as="div">
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <LoadingIcon animate color="blue400" size={50} />
                </div>
              ) : data?.getOpenApi.spec === '' || data?.getOpenApi == null ? (
                'Ekki tókst að sækja skjölun'
              ) : (
                <OpenApiView
                  spec={YamlParser.safeLoad(data?.getOpenApi.spec) as OpenApi}
                />
              )}
            </Text>
          </AccordionItem>
        </Accordion>
      </div>
    </Box>
  )
}
