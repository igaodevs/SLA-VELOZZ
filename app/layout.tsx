'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import ClientOnly from '@/components/ClientOnly'
import { AnimatedLayout } from '@/components/providers/animated-layout'

// Configure the Inter font with basic settings
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  adjustFontFallback: false
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnly>
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </ClientOnly>
      </body>
    </html>
  )
}
