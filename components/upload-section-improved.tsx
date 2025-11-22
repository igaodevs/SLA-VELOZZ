'use client'

import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, X, Loader2, AlertTriangle, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFileDrop } from '@/hooks/useFileDrop';
import { FileType } from '@/types/file';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
  accept?: string;
  maxSize?: number;
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
  onRemove,
  accept,
  maxSize = 20 * 1024 * 1024 // 20MB
}: UploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = `file-upload-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  const { isDragging, error: dropError, dragProps, resetError } = useFileDrop({
    onDrop,
    acceptedTypes: accept ? [accept] : [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ],
    maxSize,
  });

  // Mostrar erro do drop, se houver
  useEffect(() => {
    if (dropError) {
      toast.error(dropError, {
        position: 'top-center',
        duration: 5000,
      });
      // Limpa o erro após exibir a notificação
      const timer = setTimeout(() => {
        resetError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dropError, resetError]);

  // Formatar tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar arquivo antes de prosseguir
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['xlsx', 'xls', 'csv'];
      
      if (fileExt && !validExtensions.includes(fileExt)) {
        toast.error('Formato de arquivo não suportado. Use arquivos .xlsx, .xls ou .csv', {
          position: 'top-center',
          duration: 5000,
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast.error(`Arquivo muito grande (${formatFileSize(file.size)}). Tamanho máximo: ${formatFileSize(maxSize)}`, {
          position: 'top-center',
          duration: 5000,
        });
        return;
      }
      
      onFileSelect(e);
    }
    // Resetar o input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileSelect, maxSize]);

  return (
    <Card 
      className={cn(
        'p-6 transition-all',
        primary ? 'border-primary/50 bg-primary/5' : '',
        isDragging ? 'ring-2 ring-primary' : '',
        error ? 'border-red-500/50' : ''
      )}
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
              disabled={progress > 0 && progress < 100}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {!file ? (
          <div 
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg text-center transition-colors',
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
              error ? 'border-red-500/50 bg-red-500/5' : ''
            )}
          >
            <div 
              className={cn(
                'p-3 rounded-full transition-colors',
                error 
                  ? 'bg-red-500/10 text-red-500' 
                  : isDragging 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-primary/10 text-primary'
              )}
            >
              {error ? (
                <AlertTriangle className="h-5 w-5" />
              ) : isDragging ? (
                <Upload className="h-5 w-5 animate-pulse" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {error ? 'Erro no upload' : isDragging ? 'Solte o arquivo aqui' : 'Arraste e solte o arquivo'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : (
                  'ou clique para selecionar'
                )}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept || ".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"}
              onChange={handleFileSelect}
              id={fileInputId}
              ref={fileInputRef}
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
            <div className="flex items-center gap-3 p-3 bg-muted/20 hover:bg-muted/30 rounded-lg transition-colors">
              <div className={cn(
                'p-2 rounded-lg',
                progress < 100 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-green-500/10 text-green-500'
              )}>
                {progress < 100 ? (
                  <FileSpreadsheet className="h-5 w-5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  {progress > 0 && progress < 100 && (
                    <span className="text-xs font-medium text-primary">
                      {progress}%
                    </span>
                  )}
                </div>
                {progress > 0 && progress < 100 && (
                  <Progress 
                    value={progress} 
                    className="h-1.5 mt-1.5 bg-muted" 
                    indicatorClassName={cn(
                      progress < 30 ? 'bg-amber-500' : 
                      progress < 70 ? 'bg-blue-500' : 
                      'bg-green-500'
                    )}
                  />
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                disabled={progress > 0 && progress < 100}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {progress === 0 && (
              <p className="text-xs text-muted-foreground text-right">
                Aguardando envio
              </p>
            )}
            
            {progress === 100 && (
              <p className="text-xs text-green-600 text-right font-medium flex items-center justify-end gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Upload concluído
              </p>
            )}
          </div>
        )}

        {(error || dropError) && (
          <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error || dropError}</span>
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
  onFileUpload: (type: FileType, file: File | null) => void;
  onMerge: () => Promise<void>;
  isMerging: boolean;
  className?: string;
}

function UploadSectionComponent({ 
  files, 
  uploadProgress, 
  onFileUpload, 
  onMerge, 
  isMerging,
  className = '' 
}: UploadSectionProps) {
  const [errors, setErrors] = useState<{
    main: string | null;
    additional1: string | null;
    additional2: string | null;
  }>({
    main: null,
    additional1: null,
    additional2: null,
  });

  const handleDrop = useCallback((type: FileType, file: File) => {
    // Limpa erros ao tentar fazer upload de um novo arquivo
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, file);
  }, [onFileUpload]);

  const handleFileSelect = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Limpa erros ao selecionar um novo arquivo
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, file);
  }, [onFileUpload]);

  const handleRemove = useCallback((type: FileType) => {
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, null);
  }, [onFileUpload]);

  const canMerge = Boolean(files.main && files.additional1);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <UploadCard
          title="Planilha Mãe"
          subtitle="Planilha principal com os dados base"
          required
          primary
          file={files.main}
          progress={uploadProgress.main}
          error={errors.main}
          onDrop={(file) => handleDrop('main', file)}
          onFileSelect={(e) => handleFileSelect(e, 'main')}
          onRemove={() => handleRemove('main')}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
        />

        <div className="space-y-6">
          <UploadCard
            title="Planilha Avulsa 1"
            subtitle="Primeira planilha adicional (obrigatória)"
            required
            file={files.additional1}
            progress={uploadProgress.additional1}
            error={errors.additional1}
            onDrop={(file) => handleDrop('additional1', file)}
            onFileSelect={(e) => handleFileSelect(e, 'additional1')}
            onRemove={() => handleRemove('additional1')}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
          />

          <UploadCard
            title="Planilha Avulsa 2"
            subtitle="Segunda planilha adicional (opcional)"
            file={files.additional2}
            progress={uploadProgress.additional2}
            error={errors.additional2}
            onDrop={(file) => handleDrop('additional2', file)}
            onFileSelect={(e) => handleFileSelect(e, 'additional2')}
            onRemove={() => handleRemove('additional2')}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv, text/csv"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="w-full max-w-md">
          <Button
            onClick={() => {
              if (!files.main) {
                setErrors(prev => ({ ...prev, main: 'A Planilha Mãe é obrigatória' }));
                return;
              }
              if (!files.additional1) {
                setErrors(prev => ({ ...prev, additional1: 'A Planilha Avulsa 1 é obrigatória' }));
                return;
              }
              onMerge();
            }}
            disabled={!canMerge || isMerging}
            className={cn(
              'w-full gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300',
              canMerge && !isMerging ? 'hover:scale-105' : ''
            )}
            aria-busy={isMerging}
          >
            {isMerging ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-5 h-5" />
                Mesclar Planilhas
              </>
            )}
          </Button>
        </div>
        
        {!canMerge && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {!files.main && !files.additional1 
              ? 'Faça upload da Planilha Mãe e da Planilha Avulsa 1 para continuar'
              : !files.main 
                ? 'Faça upload da Planilha Mãe (obrigatória)'
                : 'Faça upload da Planilha Avulsa 1 (obrigatória)'}
          </p>
        )}
      </div>
    </div>
  );
}

export const UploadSection = memo(UploadSectionComponent);
