import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from "next-auth"
import { SessionProvider } from 'next-auth/react'
import Header from '@/components/header'

export default function App({ Component,
  pageProps: { session, ...pageProps }, }: AppProps) {
  return (
  <SessionProvider session={session}>
    <Header />
  <Component {...pageProps} />
  </SessionProvider>
  )
}