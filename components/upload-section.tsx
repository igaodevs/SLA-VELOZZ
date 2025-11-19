'use client'

import { memo, useCallback, useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFileDrop } from '@/hooks/useFileDrop';

interface UploadCardProps {
  title: string;
  subtitle: string;
  required?: boolean;
  primary?: boolean;
  file: File | null;
  progress: number;
  error?: string | null;
  onDrop: (file: File) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const UploadCard = memo(({ 
  title, 
  subtitle, 
  required = false, 
  primary = false,
  file,
  progress,
  error,
  onDrop,
  onFileSelect,
  onRemove
}: UploadCardProps) => {
  const { isDragging, dragProps } = useFileDrop(onDrop);
  const fileInputId = `file-upload-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Card 
      className={`p-6 transition-all ${primary ? 'border-primary/50 bg-primary/5' : ''} ${
        isDragging ? 'ring-2 ring-primary' : ''
      }`}
      {...dragProps}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium flex items-center gap-2">
              {title}
              {required && <span className="text-xs text-red-500">*</span>}
            </h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {file && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {!file ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Arraste e solte o arquivo</p>
              <p className="text-xs text-muted-foreground mt-1">
                ou clique para selecionar
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={onFileSelect}
              id={fileInputId}
            />
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => document.getElementById(fileInputId)?.click()}
            >
              Selecionar Arquivo
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            </div>
            {progress < 100 && (
              <Progress value={progress} className="h-2" />
            )}
          </div>
        )}

        {error && (
          <div className="mt-3 text-sm text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    </Card>
  );
});

UploadCard.displayName = 'UploadCard';

interface UploadSectionProps {
  files: {
    main: File | null;
    additional1: File | null;
    additional2: File | null;
  };
  uploadProgress: {
    main: number;
    additional1: number;
    additional2: number;
  };
  onFileUpload: (type: 'main' | 'additional1' | 'additional2', file: File | null) => void;
  onMerge: () => void;
  isMerging: boolean;
}

function UploadSectionComponent({ files, uploadProgress, onFileUpload, onMerge, isMerging }: UploadSectionProps) {
  const [errors, setErrors] = useState<{
    main: string | null;
    additional1: string | null;
    additional2: string | null;
  }>({
    main: null,
    additional1: null,
    additional2: null,
  });

  const validateFile = useCallback((file: File): string | null => {
    if (!(file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      return 'Formato inválido. Use arquivos .xlsx ou .xls';
    }
    if (file.size > 100 * 1024 * 1024) {
      return 'Arquivo muito grande. Máximo: 100MB';
    }
    return null;
  }, []);

  const handleDrop = useCallback((type: 'main' | 'additional1' | 'additional2', file: File) => {
    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, [type]: error }));
      return;
    }
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, file);
  }, [onFileUpload, validateFile]);

  const handleFileSelect = useCallback((
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
  }, [onFileUpload]);

  const handleRemoveFile = useCallback((type: 'main' | 'additional1' | 'additional2') => {
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, null);
  }, [onFileUpload]);

  const canMerge = Boolean(files.main && files.additional1);

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
              error={errors.main || null}
              onDrop={(file) => handleDrop('main', file)}
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
              error={errors.additional1 || null}
              onDrop={(file) => handleDrop('additional1', file)}
              onFileSelect={(e) => handleFileSelect(e, 'additional1')}
              onRemove={() => handleRemoveFile('additional1')}
            />

            {/* Additional 2 */}
            <UploadCard
              title="Planilha Avulsa 2"
              subtitle="Opcional - dados extras"
              file={files.additional2}
              progress={uploadProgress.additional2}
              error={errors.additional2 || null}
              onDrop={(file) => handleDrop('additional2', file)}
              onFileSelect={(e) => handleFileSelect(e, 'additional2')}
              onRemove={() => handleRemoveFile('additional2')}
            />
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              disabled={!canMerge || isMerging}
              onClick={onMerge}
            >
              <FileSpreadsheet className="w-5 h-5" />
              {isMerging ? 'Mesclando...' : 'Mesclar Planilhas'}
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

export const UploadSection = memo(UploadSectionComponent);
