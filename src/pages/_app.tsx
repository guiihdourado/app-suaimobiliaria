import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app'

import { AuthProvider } from '@/providers/AuthProvider'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  )
}
