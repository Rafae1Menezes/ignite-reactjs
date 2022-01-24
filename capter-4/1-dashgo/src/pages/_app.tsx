import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SideBarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { theme } from '../styles/theme'
import { makeServer } from '../services/mirage';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

if (process.env.NODE_ENV === 'development') {
   makeServer()
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider theme={theme}>
            <SideBarDrawerProvider>
               <Component {...pageProps} />
            </SideBarDrawerProvider>
         </ChakraProvider>
         <ReactQueryDevtools />
      </QueryClientProvider>
   )
}

export default MyApp
