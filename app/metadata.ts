import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'SLA-VELOZZ - Mescle Planilhas Excel Profissionalmente',
  description: 'Plataforma profissional para fusão de planilhas Excel de SLA do Mercado Livre. Rápido, simples e intuitivo. Suporte a arquivos grandes, filtros automáticos, gráficos dinâmicos e ranking de atrasos.',
  keywords: ['excel', 'planilhas', 'mesclar', 'sla', 'mercado livre', 'fusão', 'dados'],
  authors: [{ name: 'SLA-VELOZZ Team' }],
  openGraph: {
    title: 'SLA-VELOZZ - Mescle Planilhas Excel Profissionalmente',
    description: 'Plataforma profissional para fusão de planilhas Excel. Suporte a arquivos grandes, filtros automáticos e análise visual.',
    type: 'website',
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#f97316', // Using the orange primary color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
