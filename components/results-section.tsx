'use client'

import { useState } from 'react'
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

  const filteredData = data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField]
    const bVal = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1
    return aVal > bVal ? direction : -direction
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleDownload = () => {
    // Simulate download
    alert('Download iniciado! Arquivo Excel será baixado mantendo o padrão da planilha mãe.')
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

  return (
    <section className="bg-background border-b">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Resultado da Mesclagem</h2>
              <p className="text-muted-foreground">
                {sortedData.length} registros encontrados
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDownload} className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Download className="w-4 h-4" />
                Download Excel
              </Button>
              <Button onClick={onShowCharts} className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Gerar Gráficos
              </Button>
            </div>
          </div>

          <Card className="mb-6 shadow-sm">
            <div className="p-4 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por vendedor, data, status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 -ml-3 font-semibold"
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
                        onClick={() => handleSort('data')}
                      >
                        Data
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((row) => (
                    <TableRow 
                      key={row.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell className="font-medium">{row.vendedor}</TableCell>
                      <TableCell>{row.data}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
