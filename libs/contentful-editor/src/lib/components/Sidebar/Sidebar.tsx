import React, { FC, useContext } from 'react'
import { Box, Text } from '@island.is/island-ui/core'
import { renderer, ContentfulContext } from '@island.is/contentful-editor'

import entries from '../../fixtures/entries.json'
import types from '../../fixtures/types.json'
import assets from '../../fixtures/assets.json'
import { SmartField } from '../SmartField/SmartField'

import * as styles from './Sidebar.treat'

export const Sidebar: FC = () => {
  const { loading, entry, onChange } = useContext(ContentfulContext)

  return (
    <>
      <Box className={styles.wrapper}>
        <Text as="h3" variant="h3" fontWeight="semiBold" marginBottom={3}>
          Contentful Editor Mode
        </Text>

        {loading && <Text marginTop={2}>Loading...</Text>}

        {!loading && (
          <SmartField entryId={entry?._id} data={{ entries, types, assets }} />
        )}

        {/* !loading &&
          (entry?.fields ?? []).map((field) => {
            field._emitter.on('*', (type, e) => {
              if (type === 'onValueChanged') {
                onChange(field.id, e)
              }
            })

            return (
              <Box
                key={field.id}
                padding={2}
                background="blue100"
                borderRadius="standard"
                marginBottom={2}
              >
                <Text variant="eyebrow" marginBottom={1}>
                  {field.id}
                </Text>

                {renderer(field, field._sdk)}
              </Box>
            )
          }) */}
      </Box>

      <Box className={styles.overlay} />
    </>
  )
}
