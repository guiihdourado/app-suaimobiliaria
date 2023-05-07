import type { AppProps } from 'next/app'

import { AuthProvider } from '@/providers/AuthProvider'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="font-Inter">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  )
}
