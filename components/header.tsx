import { FileSpreadsheet, Upload, BarChart3, Settings, HelpCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HelpDialog } from '@/components/help-dialog'
import { AboutDialog } from '@/components/about-dialog'
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e Navegação */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/90 group-hover:shadow-md transition-all duration-200">
                <FileSpreadsheet className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                SLA VELOZZ
              </h1>
            </Link>

            {/* Navegação removida */}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
{/* Menu de Ajuda */}
            <div className="hidden md:flex items-center gap-1 border-l border-border pl-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  const helpDialog = document.getElementById('help-dialog')
                  if (helpDialog) {
                    (helpDialog as HTMLButtonElement).click()
                  }
                }}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Ajuda</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  const aboutDialog = document.getElementById('about-dialog')
                  if (aboutDialog) {
                    (aboutDialog as HTMLButtonElement).click()
                  }
                }}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Sobre</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <div className="hidden">
        <HelpDialog />
        <AboutDialog />
      </div>
    </header>
  )
}
