
"use client"

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Download, TrendingDown } from 'lucide-react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'

interface ChartsSectionProps {
  data: any[]
  onClose: () => void
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  const atrasos = payload.find((p: any) => p.dataKey === 'atrasos')
  const noPrazo = payload.find((p: any) => p.dataKey === 'noPrazo')
  const percentual = payload.find((p: any) => p.dataKey === 'percentual')
  const mediaDias = payload.find((p: any) => p.dataKey === 'mediaDias')

  return (
    <div className="rounded-lg border bg-background/95 px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold">{label}</p>
      {atrasos && (
        <p className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Atrasos
          </span>
          <span className="font-medium">{atrasos.value}</span>
        </p>
      )}
      {noPrazo && (
        <p className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            No prazo
          </span>
          <span className="font-medium">{noPrazo.value}</span>
        </p>
      )}
      {percentual && (
        <p className="mt-1 flex items-center justify-between gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            % de atrasos
          </span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">{percentual.value}%</span>
        </p>
      )}
      {mediaDias && mediaDias.value > 0 && (
        <p className="mt-1 flex items-center justify-between gap-4 text-muted-foreground">
          <span>Média de dias em atraso</span>
          <span className="font-medium">{mediaDias.value}d</span>
        </p>
      )}
    </div>
  )
}

export function ChartsSection({ data, onClose }: ChartsSectionProps) {
  const [selectedZona, setSelectedZona] = useState<string>('Todas')

  const zonas = Array.from(
    new Set(
      data.map((row: any) => {
        const raw = row.zona ?? row.zona_matriz
        const value = typeof raw === 'string' ? raw.trim() : raw
        return value || 'Sem zona'
      })
    )
  )
    .filter(Boolean)
    .sort()

  const filteredData = selectedZona === 'Todas'
    ? data
    : data.filter((row: any) => {
        const raw = row.zona ?? row.zona_matriz
        const value = typeof raw === 'string' ? raw.trim() : raw
        const normalized = value || 'Sem zona'
        return normalized === selectedZona
      })

  const sellerDelays = filteredData.reduce((acc, row) => {
    const vendedor = row.vendedor || row.cliente || row.conta || 'Sem vendedor'
    if (!acc[vendedor]) {
      acc[vendedor] = { vendedor, atrasos: 0, total: 0, totalDiasAtraso: 0, totalPedidos: 0 }
    }

    acc[vendedor].total++

    // Conta volume de pedidos/pacotes usando a coluna normalizada 'pedido' quando existir
    if (row.pedido) {
      acc[vendedor].totalPedidos++
    } else {
      // fallback: considera cada linha como um pedido
      acc[vendedor].totalPedidos++
    }

    if (row.status === 'Atrasado') {
      acc[vendedor].atrasos++
      acc[vendedor].totalDiasAtraso += row.dias
    }
    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(sellerDelays)
    .map((seller: any) => ({
      vendedor: seller.vendedor,
      atrasos: seller.atrasos,
      noPrazo: seller.total - seller.atrasos,
      percentual: seller.total > 0 ? Math.round((seller.atrasos / seller.total) * 100) : 0,
      mediaDias: seller.atrasos > 0 ? Math.round(seller.totalDiasAtraso / seller.atrasos) : 0,
      totalPedidos: seller.totalPedidos,
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
          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-destructive" />
                Análise de Atrasos
              </h2>
              <p className="text-muted-foreground">
                Ranking automático e percentual de vendedores com mais atrasos e maior volume de pedidos
              </p>
            </div>
            {zonas.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Filtrar por zona:</span>
                <select
                  className="h-9 rounded-md border bg-background px-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedZona}
                  onChange={(e) => setSelectedZona(e.target.value)}
                >
                  <option value="Todas">Todas</option>
                  {zonas.map((zona) => (
                    <option key={zona} value={zona}>
                      {zona}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div ref={chartRef} className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 shadow-lg">
              <h3 className="font-semibold mb-1 text-lg">Atrasos por Vendedor</h3>
              <p className="mb-4 text-xs text-muted-foreground">
                Barras mostram quantidade de registros/pedidos, linha indica percentual de atrasos.
              </p>
              <ResponsiveContainer width="100%" height={340}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
                  <defs>
                    <linearGradient id="delayBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.85} />
                    </linearGradient>
                    <linearGradient id="onTimeBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#15803d" stopOpacity={0.85} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.4} vertical={false} />
                  <XAxis
                    dataKey="vendedor"
                    className="text-[10px] md:text-xs"
                    angle={-40}
                    textAnchor="end"
                    height={70}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    label={{ value: 'Qtd. registros', angle: -90, position: 'insideLeft', offset: 10 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${v}%`}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    domain={[0, (dataMax: number) => Math.min(100, Math.max(30, Math.ceil(dataMax / 10) * 10))]}
                    label={{ value: '% atrasos', angle: 90, position: 'insideRight', offset: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.4)' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="noPrazo"
                    name="No prazo"
                    fill="url(#onTimeBar)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                    stackId="total"
                  >
                    <LabelList dataKey="noPrazo" position="top" className="text-[10px] fill-muted-foreground" />
                  </Bar>
                  <Bar
                    yAxisId="left"
                    dataKey="atrasos"
                    name="Atrasos"
                    fill="url(#delayBar)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                    stackId="total"
                  >
                    <LabelList dataKey="atrasos" position="top" className="text-[10px] fill-foreground" />
                  </Bar>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="percentual"
                    name="% atrasos"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 1, stroke: '#fff' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
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
