"use client"

import './globals.css'
import ClientOnly from '@/components/ClientOnly'
import { AnimatedLayout } from '@/components/providers/animated-layout'

// Using Google Fonts via CSS import instead of next/font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientOnly>
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </ClientOnly>
      </body>
    </html>
  )
}
