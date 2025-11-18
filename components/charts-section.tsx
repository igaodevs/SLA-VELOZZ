"use client"

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Download, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartsSectionProps {
  data: any[]
  onClose: () => void
}

export function ChartsSection({ data, onClose }: ChartsSectionProps) {
  const sellerDelays = data.reduce((acc, row) => {
    if (!acc[row.vendedor]) {
      acc[row.vendedor] = { vendedor: row.vendedor, atrasos: 0, total: 0, totalDiasAtraso: 0 }
    }
    acc[row.vendedor].total++
    if (row.status === 'Atrasado') {
      acc[row.vendedor].atrasos++
      acc[row.vendedor].totalDiasAtraso += row.dias
    }
    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(sellerDelays)
    .map((seller: any) => ({
      vendedor: seller.vendedor,
      atrasos: seller.atrasos,
      noPrazo: seller.total - seller.atrasos,
      percentual: Math.round((seller.atrasos / seller.total) * 100),
      mediaDias: seller.atrasos > 0 ? Math.round(seller.totalDiasAtraso / seller.atrasos) : 0
    }))
    .sort((a, b) => b.percentual - a.percentual)

  const chartRef = useRef<HTMLDivElement | null>(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format: 'png' | 'pdf') => {
    if (!chartRef.current) return
    try {
      setExporting(true)
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(chartRef.current, { scale: 2, useCORS: true, backgroundColor: null })
      const dataUrl = canvas.toDataURL('image/png')

      if (format === 'png') {
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = `grafico_atrasos_${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
      } else {
        const { jsPDF } = await import('jspdf')
        const pdf = new jsPDF({ orientation: 'landscape' })
        const imgProps = pdf.getImageProperties(dataUrl)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`grafico_atrasos_${Date.now()}.pdf`)
      }
    } catch (err) {
      // graceful fallback
      console.error('Export failed', err)
      alert('Falha ao exportar. Verifique o console para mais detalhes.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-in fade-in duration-300">
      <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-destructive" />
                Análise de Atrasos
              </h2>
              <p className="text-muted-foreground">
                Ranking automático e percentual de vendedores com mais atrasos
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div ref={chartRef} className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 shadow-lg">
              <h3 className="font-semibold mb-4 text-lg">Atrasos por Vendedor</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                  <XAxis 
                    dataKey="vendedor" 
                    className="text-xs" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="atrasos" fill="#ef4444" name="Atrasos" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="noPrazo" fill="#22c55e" name="No Prazo" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 shadow-lg">
              <h3 className="font-semibold mb-4 text-lg">Ranking - Vendedores com Mais Atrasos</h3>
              <div className="space-y-4">
                {chartData.slice(0, 5).map((seller, index) => (
                  <div key={seller.vendedor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                          index === 0 ? 'bg-red-500 text-white' :
                          index === 1 ? 'bg-orange-500 text-white' :
                          index === 2 ? 'bg-amber-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold">{seller.vendedor}</span>
                          <p className="text-xs text-muted-foreground">
                            {seller.atrasos} atrasos de {seller.atrasos + seller.noPrazo} registros
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${
                          seller.percentual > 50 ? 'text-red-600 dark:text-red-400' : 
                          seller.percentual > 30 ? 'text-orange-600 dark:text-orange-400' :
                          'text-amber-600 dark:text-amber-400'
                        }`}>
                          {seller.percentual}%
                        </span>
                        {seller.mediaDias > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Média: {seller.mediaDias}d
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          seller.percentual > 50 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          seller.percentual > 30 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                          'bg-gradient-to-r from-amber-500 to-amber-600'
                        }`}
                        style={{ width: `${seller.percentual}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleExport('png')}
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              disabled={exporting}
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exportando...' : 'Exportar PNG'}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              disabled={exporting}
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exportando...' : 'Exportar PDF'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
