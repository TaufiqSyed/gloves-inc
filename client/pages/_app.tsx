// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import { AnimatePresence } from 'framer-motion';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <AnimatePresence exitBeforeEnter initial={true}>
//       <Component {...pageProps} />
//     </AnimatePresence>
//   );
// }

// export default MyApp;

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'

import { AnimatePresence } from 'framer-motion'
import '@fontsource/open-sans/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AnimatePresence exitBeforeEnter initial={true}>
        <Component {...pageProps} />
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
