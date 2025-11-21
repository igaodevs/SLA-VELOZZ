"use client"

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, BarChart3, Search, ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ResultsSectionProps {
  data: any[]
  onShowCharts: () => void
}

export function ResultsSection({ data, onShowCharts }: ResultsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [exporting, setExporting] = useState(false)
  const deferredSearch = useDeferredValue(searchTerm)
  const pageSizeOptions = [25, 50, 100]
  const [pageSize, setPageSize] = useState(pageSizeOptions[1])
  const [page, setPage] = useState(1)

  const processedData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : []
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    const filtered = !normalizedSearch
      ? safeData
      : safeData.filter((row) =>
          Object.values(row).some((val) =>
            String(val ?? '')
              .toLowerCase()
              .includes(normalizedSearch)
          )
        )

    if (!sortField) {
      return filtered
    }

    return [...filtered].sort((a, b) => {
      const aVal = a[sortField as keyof typeof a]
      const bVal = b[sortField as keyof typeof b]
      if (aVal === bVal) return 0
      const direction = sortDirection === 'asc' ? 1 : -1

      if (aVal === undefined || aVal === null) return -direction
      if (bVal === undefined || bVal === null) return direction

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal > bVal ? direction : -direction
      }

      return String(aVal).localeCompare(String(bVal), 'pt-BR', { numeric: true }) * direction
    })
  }, [data, deferredSearch, sortField, sortDirection])

  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize))

  useEffect(() => {
    setPage(1)
  }, [processedData, pageSize])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const visibleData = useMemo(() => {
    const start = (page - 1) * pageSize
    return processedData.slice(start, start + pageSize)
  }, [processedData, page, pageSize])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleDownload = async () => {
    if (!data || data.length === 0) return
    try {
      setExporting(true)
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Resultado')
      XLSX.writeFile(wb, 'mesclagem_resultado.xlsx')
    } catch (err) {
      console.error('Erro ao gerar Excel', err)
      alert('Falha ao gerar arquivo Excel. Veja o console para detalhes.')
    } finally {
      setExporting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Atrasado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
      case 'No Prazo':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'
      case 'Atenção':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  } as const

  const rowVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
    },
  } as const

  return (
    <section className="bg-background border-b">
      <div className="container mx-auto px-3 sm:px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1.5 md:mb-2">Resultado da Mesclagem</h2>
              <p className="text-muted-foreground">
                {processedData.length} registros encontrados
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={exporting}
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Gerando...' : 'Download Excel'}
              </Button>
              <Button onClick={onShowCharts} className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Gerar Gráficos
              </Button>
            </div>
          </div>

          <Card className="mb-4 md:mb-6 shadow-sm">
            <div className="p-3 md:p-4 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por vendedor, fonte, prazo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <Table className="min-w-[1024px] text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold text-xs sm:text-sm"
                        onClick={() => handleSort('id')}
                      >
                        ID
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('vendedor')}
                      >
                        Vendedor
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('fonte_planilha')}
                      >
                        Fonte
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('prazo_previsto')}
                      >
                        Prazo Previsto
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('data_entrega_confirmada')}
                      >
                        Entrega Real
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('status')}
                      >
                        Status SLA
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('dias')}
                      >
                        Dias Atraso
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
                        onClick={() => handleSort('motivo_atraso')}
                      >
                        Motivo
                        <ArrowUpDown className="w-3 h-3" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12">
                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                          <div className="rounded-full bg-muted p-3">
                            <BarChart3 className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">Nenhum registro disponível</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              A mesclagem foi concluída, mas nenhum registro corresponde aos filtros atuais.
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {visibleData.map((row) => (
                    <motion.tr
                      key={row.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className="hover:bg-muted/30 transition-colors text-xs sm:text-sm"
                      whileHover={{ scale: 1.005, transition: { duration: 0.15 } }}
                    >
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell className="font-medium">{row.vendedor || 'Sem vendedor'}</TableCell>
                      <TableCell>{row.fonte_planilha || 'Planilha não identificada'}</TableCell>
                      <TableCell>{row.prazo_previsto || 'Sem previsão'}</TableCell>
                      <TableCell>{row.data_entrega_confirmada || 'Pendente'}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusBadge(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {row.dias > 0 ? (
                          <span className={`font-bold ${
                            row.dias >= 5 ? 'text-red-600 dark:text-red-400' :
                            row.dias >= 3 ? 'text-orange-600 dark:text-orange-400' :
                            'text-amber-600 dark:text-amber-400'
                          }`}>
                            {row.dias} dias
                          </span>
                        ) : (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            No prazo
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[220px]">
                        <p className="text-xs text-muted-foreground">
                          {row.motivo_atraso || 'Atraso identificado automaticamente'}
                        </p>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-3 sm:px-0">
            <div className="text-sm text-muted-foreground">
              {processedData.length > 0 ? (
                <>
                  Mostrando{' '}
                  <span className="font-medium text-foreground">
                    {(page - 1) * pageSize + 1}
                  </span>{' '}
                  a{' '}
                  <span className="font-medium text-foreground">
                    {Math.min(page * pageSize, processedData.length)}
                  </span>{' '}
                  de{' '}
                  <span className="font-semibold text-foreground">{processedData.length}</span>{' '}
                  registros
                </>
              ) : (
                'Nenhum registro encontrado'
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Linhas por página:
                <select
                  className="h-9 rounded-md border bg-background px-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {pageSizeOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página{' '}
                  <span className="font-semibold text-foreground">{page}</span> de{' '}
                  <span className="font-semibold text-foreground">{totalPages}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
