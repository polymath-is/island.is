import { AppProps } from 'next/app'
import { theme } from './theme.treat'
import { TreatProvider } from 'react-treat'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('theme', theme)
  return (
    <TreatProvider theme={theme}>
      <Component {...pageProps} />
    </TreatProvider>
  )
}

export default MyApp
