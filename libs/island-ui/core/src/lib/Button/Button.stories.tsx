import React from 'react'
import { TreatProvider } from 'react-treat'
import Button from './Button'
import { theme } from './theme.treat'

export default {
  title: 'Components/Button',
  component: Button,
}

const Wrapper = ({ children }) => {
  return <TreatProvider theme={theme}>{children}</TreatProvider>
}

export const DefaultButton = () => (
  <Wrapper>
    <Button>Default button</Button>
  </Wrapper>
)

export const Large = () => (
  <Wrapper>
    <Button size="large">Large button</Button>
  </Wrapper>
)
