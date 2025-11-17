'use client'

import { useCallback, useState } from 'react'
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface UploadSectionProps {
  files: {
    main: File | null
    additional1: File | null
    additional2: File | null
  }
  uploadProgress: {
    main: number
    additional1: number
    additional2: number
  }
  onFileUpload: (type: 'main' | 'additional1' | 'additional2', file: File) => void
  onMerge: () => void
}

export function UploadSection({ files, uploadProgress, onFileUpload, onMerge }: UploadSectionProps) {
  const [errors, setErrors] = useState<{
    main: string | null
    additional1: string | null
    additional2: string | null
  }>({
    main: null,
    additional1: null,
    additional2: null,
  })

  const handleDrop = useCallback((
    e: React.DragEvent,
    type: 'main' | 'additional1' | 'additional2'
  ) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    
    if (!(file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setErrors(prev => ({ ...prev, [type]: 'Formato inválido. Use arquivos .xlsx ou .xls' }))
      return
    }
    
    // Check file size (example: max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: 'Arquivo muito grande. Máximo: 100MB' }))
      return
    }
    
    setErrors(prev => ({ ...prev, [type]: null }))
    onFileUpload(type, file)
  }, [onFileUpload])

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'additional1' | 'additional2'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (!(file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setErrors(prev => ({ ...prev, [type]: 'Formato inválido. Use arquivos .xlsx ou .xls' }))
      return
    }
    
    if (file.size > 100 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: 'Arquivo muito grande. Máximo: 100MB' }))
      return
    }
    
    setErrors(prev => ({ ...prev, [type]: null }))
    onFileUpload(type, file)
  }

  const handleRemoveFile = (type: 'main' | 'additional1' | 'additional2') => {
    // This would need to be passed from parent, but for now we'll show the concept
    setErrors(prev => ({ ...prev, [type]: null }))
  }

  const canMerge = files.main && files.additional1

  return (
    <section className="border-b bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Upload de Planilhas</h2>
            <p className="text-muted-foreground text-balance">
              Arraste e solte seus arquivos ou clique para selecionar. Suporte a arquivos grandes (&gt;50MB).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Main Spreadsheet */}
            <UploadCard
              title="Planilha Mãe"
              subtitle="Logmanager SLA"
              required
              primary
              file={files.main}
              progress={uploadProgress.main}
              error={errors.main}
              onDrop={(e) => handleDrop(e, 'main')}
              onFileSelect={(e) => handleFileSelect(e, 'main')}
              onRemove={() => handleRemoveFile('main')}
            />

            {/* Additional 1 */}
            <UploadCard
              title="Planilha Avulsa 1"
              subtitle="Dados complementares"
              required
              file={files.additional1}
              progress={uploadProgress.additional1}
              error={errors.additional1}
              onDrop={(e) => handleDrop(e, 'additional1')}
              onFileSelect={(e) => handleFileSelect(e, 'additional1')}
              onRemove={() => handleRemoveFile('additional1')}
            />

            {/* Additional 2 */}
            <UploadCard
              title="Planilha Avulsa 2"
              subtitle="Opcional - dados extras"
              file={files.additional2}
              progress={uploadProgress.additional2}
              error={errors.additional2}
              onDrop={(e) => handleDrop(e, 'additional2')}
              onFileSelect={(e) => handleFileSelect(e, 'additional2')}
              onRemove={() => handleRemoveFile('additional2')}
            />
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              disabled={!canMerge}
              onClick={onMerge}
            >
              <FileSpreadsheet className="w-5 h-5" />
              Mesclar Planilhas
            </Button>
          </div>
          
          {!canMerge && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {!files.main && !files.additional1 
                ? 'Faça upload da Planilha Mãe e da Planilha Avulsa 1 para continuar'
                : !files.main 
                  ? 'Faça upload da Planilha Mãe (obrigatória)'
                  : 'Faça upload da Planilha Avulsa 1 (obrigatória)'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

interface UploadCardProps {
  title: string
  subtitle: string
  required?: boolean
  primary?: boolean
  file: File | null
  progress: number
  error?: string | null
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

function UploadCard({
  title,
  subtitle,
  required,
  primary,
  file,
  progress,
  error,
  onDrop,
  onFileSelect,
  onRemove
}: UploadCardProps) {
  const isUploading = progress > 0 && progress < 100
  const isComplete = file && progress === 100
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 ${
        primary ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      } ${isDragging ? 'ring-2 ring-primary bg-primary/5 scale-105' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        setIsDragging(false)
        onDrop(e)
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {required && (
            <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
              Obrigatório
            </span>
          )}
        </div>

        {!file ? (
          <label className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/10 scale-105' 
              : 'hover:border-primary hover:bg-primary/5'
          }`}>
            <Upload className={`w-8 h-8 mb-2 transition-colors ${
              isDragging ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground text-center px-2">
              {isDragging ? 'Solte o arquivo aqui' : 'Arraste ou clique para selecionar'}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              .xlsx ou .xls (máx. 100MB)
            </span>
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={onFileSelect}
            />
          </label>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              {isComplete && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 animate-in zoom-in duration-300" />
              )}
            </div>

            {isUploading && (
              <div className="space-y-1">
                <Progress value={progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  Carregando... {progress}%
                </p>
              </div>
            )}

            {isComplete && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 animate-in fade-in duration-500">
                <CheckCircle2 className="w-3 h-3" />
                Arquivo carregado com sucesso
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg animate-in fade-in duration-300">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive font-medium">{error}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
