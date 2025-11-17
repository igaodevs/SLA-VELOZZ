import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientOnly from '@/components/ClientOnly'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SLA Fusion - Mescle Planilhas Excel Profissionalmente',
  description: 'Plataforma profissional para fusão de planilhas Excel de SLA do Mercado Livre. Rápido, simples e intuitivo. Suporte a arquivos grandes, filtros automáticos, gráficos dinâmicos e ranking de atrasos.',
  keywords: ['excel', 'planilhas', 'mesclar', 'sla', 'mercado livre', 'fusão', 'dados'],
  authors: [{ name: 'SLA Fusion Team' }],
  openGraph: {
    title: 'SLA Fusion - Mescle Planilhas Excel Profissionalmente',
    description: 'Plataforma profissional para fusão de planilhas Excel. Suporte a arquivos grandes, filtros automáticos e análise visual.',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnly>
          {children}
        </ClientOnly>
      </body>
    </html>
  )
}
