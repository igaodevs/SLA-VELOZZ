import { FileSpreadsheet } from 'lucide-react'
import { HelpDialog } from '@/components/help-dialog'
import { AboutDialog } from '@/components/about-dialog'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <FileSpreadsheet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SLA VELOZZ</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Mesclagem profissional de planilhas
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <AboutDialog />
            <HelpDialog />
          </nav>
        </div>
      </div>
    </header>
  )
}
