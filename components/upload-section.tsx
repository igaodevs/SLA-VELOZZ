'use client'

import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFileDrop } from '@/hooks/useFileDrop';
import { FileType } from '@/types/file';
import { toast } from 'sonner';

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
  maxSize?: number; // in bytes
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
  maxSize
}: UploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = `file-upload-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  const { isDragging, error: dropError, dragProps } = useFileDrop({
    onDrop,
    acceptedTypes: accept ? [accept] : ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxSize: maxSize || 10 * 1024 * 1024, // 10MB default
  });

  // Mostrar erro do drop, se houver
  useEffect(() => {
    if (dropError) {
      toast.error(dropError);
    }
  }, [dropError]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(e);
    }
    // Resetar o input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileSelect]);

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
              accept={accept || ".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
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
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {progress > 0 && progress < 100 ? (
                <Loader2 className="h-5 w-5 text-primary flex-shrink-0 animate-spin" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
            </div>
            {progress > 0 && progress < 100 && (
              <>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  Enviando... {progress}%
                </p>
              </>
            )}
            {progress === 0 && (
              <p className="text-xs text-muted-foreground text-right">
                Aguardando envio
              </p>
            )}
            {progress === 100 && (
              <p className="text-xs text-green-600 text-right font-medium">
                Upload concluído
              </p>
            )}
          </div>
        )}

        {(error || dropError) && (
          <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
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

  const handleRemove = useCallback((type: 'main' | 'additional1' | 'additional2') => {
    setErrors(prev => ({ ...prev, [type]: null }));
    onFileUpload(type, null);
  }, [onFileUpload]);

  const canMerge = Boolean(files.main && files.additional1);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Upload de Planilhas</h2>
        <p className="text-muted-foreground text-balance">
          Arraste e solte seus arquivos ou clique para selecionar. Suporte a arquivos grandes (&gt;50MB).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UploadCard
          title="Planilha Mãe"
          subtitle="Planilha principal para mesclagem"
          required
          primary
          file={files.main}
          progress={uploadProgress.main}
          error={errors.main}
          onDrop={(file) => handleDrop('main', file)}
          onFileSelect={(e) => handleFileSelect(e, 'main')}
          onRemove={() => handleRemove('main')}
          accept=".xlsx,.xls"
          maxSize={100 * 1024 * 1024}
        />

        <UploadCard
          title="Planilha Avulsa 1"
          subtitle="Primeira planilha para mesclagem"
          required
          file={files.additional1}
          progress={uploadProgress.additional1}
          error={errors.additional1}
          onDrop={(file) => handleDrop('additional1', file)}
          onFileSelect={(e) => handleFileSelect(e, 'additional1')}
          onRemove={() => handleRemove('additional1')}
          accept=".xlsx,.xls"
          maxSize={100 * 1024 * 1024}
        />

        <UploadCard
          title="Planilha Avulsa 2"
          subtitle="Segunda planilha para mesclagem (opcional)"
          file={files.additional2}
          progress={uploadProgress.additional2}
          error={errors.additional2}
          onDrop={(file) => handleDrop('additional2', file)}
          onFileSelect={(e) => handleFileSelect(e, 'additional2')}
          onRemove={() => handleRemove('additional2')}
          accept=".xlsx,.xls"
          maxSize={100 * 1024 * 1024}
        />
      </div>

      <div className="flex justify-center mt-8">
        <Button
          className="gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          disabled={!canMerge || isMerging}
          onClick={async () => {
            try {
              await onMerge();
            } catch (error) {
              console.error('Error during merge:', error);
              toast.error('Erro ao mesclar planilhas. Por favor, tente novamente.');
            }
          }}
        >
          {isMerging ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileSpreadsheet className="w-5 h-5" />
          )}
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
  )
}

export const UploadSection = memo(UploadSectionComponent);
