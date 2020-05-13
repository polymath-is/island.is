import { AppProps } from 'next/app'
import '@island.is/island-ui/core/reset'
import { BraidProvider } from '@island.is/island-ui/core'
import theme from '@island.is/island-ui/core/themes/jobsDb'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BraidProvider theme={theme}>
      <Component {...pageProps} />
    </BraidProvider>
  )
}

export default MyApp
