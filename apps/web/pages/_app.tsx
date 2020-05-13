import { AppProps } from 'next/app'
import '@island.is/island-ui/core/reset'
import { BraidProvider } from '@island.is/island-ui/core'
import jobStreetTheme from '@island.is/island-ui/core/themes/jobStreetClassic'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BraidProvider theme={jobStreetTheme}>
      <Component {...pageProps} />
    </BraidProvider>
  )
}

export default MyApp
