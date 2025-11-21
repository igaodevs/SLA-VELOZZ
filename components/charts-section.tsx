"use client"

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Download, TrendingDown } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Brush,
  Cell,
} from 'recharts'

interface ChartsSectionProps {
  data: any[]
  onClose: () => void
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]?.payload
  if (!data) return null

  return (
    <div className="rounded-xl border bg-background/95 px-4 py-3 text-xs shadow-xl">
      <p className="mb-1 text-sm font-semibold">{label}</p>
      <div className="space-y-1.5 text-muted-foreground">
        <p className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            Atrasos
          </span>
          <span className="font-semibold text-foreground">{data.atrasos} pedidos</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            No prazo
          </span>
          <span className="font-medium">{data.noPrazo} pedidos</span>
        </p>
        <p className="flex items-center justify-between">
          <span>Média de atraso</span>
          <span className="font-medium text-foreground">
            {data.mediaDias > 0 ? `${data.mediaDias} dias` : 'Sem atraso'}
          </span>
        </p>
        <p className="flex items-center justify-between">
          <span>Total analisado</span>
          <span className="font-medium text-foreground">{data.atrasos + data.noPrazo} pedidos</span>
        </p>
      </div>
    </div>
  )
}

function LegendContent() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        Atrasos
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        No prazo
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2 w-6 rounded-full border border-dashed border-primary/60" />
        Média geral
      </div>
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
    acc[vendedor].totalPedidos++

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

  const topSellers = chartData.slice(0, 10)
  const totalSellers = chartData.length

  const metrics = chartData.reduce(
    (acc, seller) => {
      acc.totalAtrasos += seller.atrasos
      acc.totalPedidos += seller.atrasos + seller.noPrazo
      acc.mediaPercentual += seller.percentual
      return acc
    },
    { totalAtrasos: 0, totalPedidos: 0, mediaPercentual: 0 }
  )

  const avgPercentual = totalSellers ? Math.round(metrics.mediaPercentual / totalSellers) : 0

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
      console.error('Export failed', err)
      alert('Falha ao exportar. Verifique o console para mais detalhes.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-in fade-in duration-300">
      <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8 h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start md:items-center mb-6 md:mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1.5 md:mb-2 flex items-center gap-2 md:gap-3">
                <TrendingDown className="w-7 h-7 md:w-8 md:h-8 text-destructive" />
                Análise de Atrasos
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
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

          <div ref={chartRef} className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">
            <Card className="p-4 md:p-6 shadow-lg">
              <div className="flex flex-col gap-1 mb-4">
                <h3 className="text-lg font-semibold">Percentual de atrasos por vendedor</h3>
                <p className="text-xs text-muted-foreground">
                  Barras verticais ordenadas por maior percentual de atrasos considerando os pedidos analisados.
                </p>
              </div>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={chartData} margin={{ top: 20, right: 16, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.25} />
                  <XAxis
                    dataKey="vendedor"
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    className="text-[11px] md:text-xs"
                    height={60}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
                  <Legend verticalAlign="top" align="right" content={<LegendContent />} wrapperStyle={{ paddingBottom: 16 }} />
                  <ReferenceLine
                    y={avgPercentual}
                    stroke="hsl(var(--primary))"
                    strokeDasharray="3 3"
                    strokeOpacity={0.6}
                    label={{
                      value: `Média ${avgPercentual}%`,
                      position: 'right',
                      fill: 'hsl(var(--primary))',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />
                  {/* BARRAS EMPILHADAS COLORIDAS */}
                  <Bar dataKey="atrasos" stackId="a" fill="#ef4444" radius={[8, 0, 0, 8]} barSize={26}>
                    <LabelList dataKey="atrasos" position="insideTop" className="text-[10px] md:text-xs fill-white font-semibold" />
                  </Bar>
                  <Bar dataKey="noPrazo" stackId="a" fill="#22c55e" radius={[0, 8, 8, 0]} barSize={26}>
                    <LabelList dataKey="noPrazo" position="insideTop" className="text-[10px] md:text-xs fill-white font-semibold" />
                  </Bar>
                  {chartData.length > 12 && (
                    <Brush
                      dataKey="vendedor"
                      height={18}
                      travellerWidth={12}
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--muted))"
                      className="[&>rect]:rounded-full"
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* PANORAMA DE MÉTRICAS */}
            <Card className="p-4 md:p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-1.5">Panorama dos atrasos</h3>
                  <p className="text-xs text-muted-foreground">
                    Métricas consolidadas após aplicar o filtro Mercado Livre.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-sm">
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Pedidos analisados</p>
                    <p className="mt-1 text-2xl font-bold">{metrics.totalPedidos}</p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Pedidos atrasados</p>
                    <p className="mt-1 text-2xl font-bold text-destructive">{metrics.totalAtrasos}</p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Média geral</p>
                    <p className="mt-1 text-2xl font-bold">{avgPercentual}%</p>
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Vendedores avaliados</p>
                    <p className="mt-1 text-2xl font-bold">{totalSellers}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-3">Ranking detalhado</h4>
                  <div className="space-y-3">
                    {topSellers.slice(0, 5).map((seller, index) => (
                      <div key={seller.vendedor} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-8 w-8 rounded-full text-sm font-bold flex items-center justify-center ${
                              index === 0
                                ? 'bg-red-500 text-white'
                                : index === 1
                                  ? 'bg-orange-500 text-white'
                                  : index === 2
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-muted text-foreground'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{seller.vendedor}</p>
                            <p className="text-xs text-muted-foreground">
                              {seller.atrasos} atrasos de {seller.atrasos + seller.noPrazo} pedidos
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">{seller.percentual}%</p>
                          {seller.mediaDias > 0 && (
                            <p className="text-xs text-muted-foreground">Média {seller.mediaDias} dias</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
