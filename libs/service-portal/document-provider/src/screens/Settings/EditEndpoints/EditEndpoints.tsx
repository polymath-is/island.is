import React from 'react'
import { ServicePortalModuleComponent } from '@island.is/service-portal/core'
import { useLocale } from '@island.is/localization'
import { Box, Text } from '@island.is/island-ui/core'
import { m } from '../../../lib/messages'

const EditEndpoints: ServicePortalModuleComponent = ({ userInfo }) => {
  const { formatMessage } = useLocale()

  return (
    <Box marginBottom={[2, 3, 5]}>
      <Text variant="h1" as="h1">
        {formatMessage(m.SettingsEditEndPointsTitle)}
      </Text>
      <Text as="p">{formatMessage(m.SettingsEditEndPointsDescription)}</Text>
    </Box>
  )
}

export default EditEndpoints
