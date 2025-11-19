import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AlertCircle, FileSpreadsheet, CheckCircle2 } from 'lucide-react'

interface PreviewSectionProps {
  files: {
    main: File | null
    additional1: File | null
    additional2: File | null
  }
  applyMeliFilter: boolean
  onFilterChange: (checked: boolean) => void
}

export function PreviewSection({ files, applyMeliFilter, onFilterChange }: PreviewSectionProps) {
  const [recordCounts, setRecordCounts] = useState<{
    main: number
    additional1: number
    additional2: number
  }>({
    main: 0,
    additional1: 0,
    additional2: 0,
  })

  // Calcula a quantidade real de registros em cada planilha usando a biblioteca xlsx.
  useEffect(() => {
    const computeCounts = async () => {
      if (!files.main && !files.additional1 && !files.additional2) {
        setRecordCounts({ main: 0, additional1: 0, additional2: 0 })
        return
      }

      const XLSX = await import('xlsx')

      const countRows = async (file: File | null): Promise<number> => {
        if (!file) return 0
        try {
          const arrayBuffer = await file.arrayBuffer()
          const workbook = XLSX.read(arrayBuffer, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(sheet, { defval: null }) as any[]
          return json.length
        } catch {
          return 0
        }
      }

      const [mainCount, add1Count, add2Count] = await Promise.all([
        countRows(files.main),
        countRows(files.additional1),
        countRows(files.additional2),
      ])

      setRecordCounts({
        main: mainCount,
        additional1: add1Count,
        additional2: add2Count,
      })
    }

    computeCounts()
  }, [files])

  const getRecordCount = (type: 'main' | 'additional1' | 'additional2') => {
    return recordCounts[type] ?? 0
  }

  const totalRecords =
    getRecordCount('main') + getRecordCount('additional1') + getRecordCount('additional2')

  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Pré-Visualização e Automação</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                Arquivos Carregados
              </h3>
              <div className="space-y-3">
                {files.main && (
                  <div className="flex justify-between items-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <span className="text-sm font-medium">Planilha Mãe</span>
                    <span className="text-sm text-muted-foreground">
                      {getRecordCount('main')} registros
                    </span>
                  </div>
                )}
                {files.additional1 && (
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Planilha Avulsa 1</span>
                    <span className="text-sm text-muted-foreground">
                      {getRecordCount('additional1')} registros
                    </span>
                  </div>
                )}
                {files.additional2 && (
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Planilha Avulsa 2</span>
                    <span className="text-sm text-muted-foreground">
                      {getRecordCount('additional2')} registros
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg mt-4">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Total de registros
                  </span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {totalRecords} registros
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Opções de Mesclagem Inteligente</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <Checkbox 
                    id="meli-filter" 
                    checked={applyMeliFilter}
                    onCheckedChange={(checked) => onFilterChange(checked === true)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="meli-filter" 
                      className="text-sm font-semibold cursor-pointer"
                    >
                      Aplicar filtro Meli automaticamente
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Filtra apenas registros relacionados ao Mercado Livre por nome ou código
                    </p>
                  </div>
                </div>

                {!files.additional2 && (
                  <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        Terceira planilha não enviada
                      </p>
                      <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                        A fusão será realizada com os arquivos disponíveis.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Automação Ativa</p>
                    <ul className="text-xs text-muted-foreground mt-1.5 space-y-1">
                      <li>• Alinhamento automático de colunas</li>
                      <li>• Manutenção do padrão da planilha mãe</li>
                      <li>• Detecção de inconsistências</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
