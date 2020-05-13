import '@island.is/island-ui/core/reset'
import React from 'react'
import { Text, Tiles, Box } from '@island.is/island-ui/core'

export const Index = () => {
  return (
    <div>
      <Tiles space="xlarge" columns={4}>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
        <Box padding="xlarge">
          <Text>Some text here...</Text>
        </Box>
      </Tiles>
    </div>
  )
}

export default Index
