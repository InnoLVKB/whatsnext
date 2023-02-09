import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import DragContextProvider from '../context/DragContext'
export default function App ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <DragContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </DragContextProvider>
  )
}
