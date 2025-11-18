import { FileSpreadsheet, HelpCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HelpDialog } from '@/components/help-dialog'
import { AboutDialog } from '@/components/about-dialog'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm transition-all duration-200 hover:bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-2.5 transition-all duration-200 hover:opacity-90"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 shadow-sm transition-all duration-300 group-hover:shadow-md">
              <FileSpreadsheet className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <h1 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              SLA VELOZZ
            </h1>
          </Link>

          {/* Actions */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-md p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => {
                  const helpDialog = document.getElementById('help-dialog')
                  helpDialog?.click()
                }}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Ajuda</span>
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-md p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => {
                  const aboutDialog = document.getElementById('about-dialog')
                  aboutDialog?.click()
                }}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Sobre</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden dialogs */}
      <div className="hidden">
        <HelpDialog />
        <AboutDialog />
      </div>
    </header>
  )
}
