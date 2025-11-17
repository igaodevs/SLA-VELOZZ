'use client'

import { useState } from 'react'
import { Info, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react'
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

export function AboutDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          Sobre
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            SLA-VELOZZ
          </DialogTitle>
          <DialogDescription>
            Plataforma profissional para mesclagem de planilhas Excel
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            O SLA-VELOZZ foi desenvolvido especialmente para otimizar o processo de mesclagem de planilhas 
            de SLA do Mercado Livre, permitindo análise rápida e eficiente de dados de múltiplas fontes.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Rápido e Eficiente</h3>
                  <p className="text-xs text-muted-foreground">
                    Processa arquivos grandes em segundos com tecnologia otimizada
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Seguro e Confiável</h3>
                  <p className="text-xs text-muted-foreground">
                    Seus dados são processados com segurança e privacidade
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Automação Inteligente</h3>
                  <p className="text-xs text-muted-foreground">
                    Filtros e ajustes automáticos para economizar seu tempo
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Análise Visual</h3>
                  <p className="text-xs text-muted-foreground">
                    Gráficos e rankings para insights instantâneos
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2">Recursos Principais</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li>✓ Suporte a arquivos &gt;50MB</li>
              <li>✓ Filtro Meli automático</li>
              <li>✓ Tabelas interativas</li>
              <li>✓ Gráficos dinâmicos</li>
              <li>✓ Ranking de atrasos</li>
              <li>✓ Exportação em Excel/PNG/PDF</li>
              <li>✓ Design responsivo</li>
              <li>✓ Interface intuitiva</li>
            </ul>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              © 2025 SLA-VELOZZ. Desenvolvido para otimizar sua gestão de SLA.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
