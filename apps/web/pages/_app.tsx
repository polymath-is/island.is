import { AppProps } from 'next/app'
import 'braid-design-system/reset' // <-- Must be first
import jobStreetTheme from 'braid-design-system/themes/jobStreet'
import { BraidProvider, Text, Tiles, Box } from 'braid-design-system'
import { Provider } from '@island.is/island-ui/core'
// import { theme } from './theme.treat'
// import { TreatProvider } from 'react-treat'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Text>Hello!</Text>
    </Provider>
  )
}

export default MyApp
