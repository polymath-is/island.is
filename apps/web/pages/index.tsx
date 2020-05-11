import React from 'react'
import { Button } from '@island.is/island-ui/core'

export const Index = () => {
  return (
    <div>
      <Button size="large" onClick={() => console.log('ok')}>
        Simple text button!
      </Button>
      <Button variant="ghost">Simple text button!</Button>
    </div>
  )
}

export default Index
