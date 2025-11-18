'use client'

import { useState } from 'react'
import { HelpCircle, FileSpreadsheet, Upload, BarChart3, Filter, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'

export function HelpDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="help-dialog" variant="ghost" size="sm" className="gap-2 hidden">
          <HelpCircle className="w-4 h-4" />
          Ajuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Como usar o SLA Fusion</DialogTitle>
          <DialogDescription>
            Guia completo para mesclar suas planilhas Excel de forma profissional
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Step 1 */}
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">1. Upload de Planilhas</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Carregue suas planilhas Excel arrastando e soltando ou clicando para selecionar.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Planilha Mãe:</strong> Logmanager SLA (obrigatória)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Planilha Avulsa 1:</strong> Dados complementares (obrigatória)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Planilha Avulsa 2:</strong> Dados extras (opcional)</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded">
                  💡 Suporte a arquivos grandes (&gt;50MB) em formatos .xlsx e .xls
                </p>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">2. Pré-Visualização e Filtros</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Revise os arquivos carregados e configure as opções de mesclagem.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Filtro Meli:</strong> Ativado automaticamente para filtrar apenas registros do Mercado Livre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Automação:</strong> Alinhamento de colunas e detecção de inconsistências</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Contagem:</strong> Visualize quantos registros serão mesclados</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">3. Resultados da Mesclagem</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Visualize, pesquise e exporte os dados mesclados.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Tabela Interativa:</strong> Ordenação, pesquisa e filtros dinâmicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Destaques Visuais:</strong> Verde (no prazo), Vermelho (atrasado), Amarelo (atenção)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Download Excel:</strong> Exporta mantendo o padrão da planilha mãe</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">4. Gráficos Inteligentes</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Análise visual com ranking de vendedores e percentuais de atraso.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Gráficos em Barras:</strong> Visualização colorida e intuitiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Ranking Automático:</strong> Vendedores com mais atrasos no topo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Exportação:</strong> Salve gráficos em PNG ou PDF</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Dicas importantes
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Certifique-se que as planilhas têm colunas compatíveis</li>
              <li>• Use a planilha mãe com o formato padrão desejado</li>
              <li>• Arquivos grandes podem levar alguns segundos para processar</li>
              <li>• A plataforma mantém a segurança dos seus dados</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => setOpen(false)}>
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
