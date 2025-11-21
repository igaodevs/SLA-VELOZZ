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
  maxSize = 10 * 1024 * 1024 // 10MB default
}: UploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = `file-upload-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  const { isDragging, error: dropError, dragProps } = useFileDrop({
    onDrop,
    acceptedTypes: accept ? [accept] : ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxSize,
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
  onMerge: () => void | Promise<void>;
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
    onFileUpload(type, file);
  }, [onFileUpload]);

  const handleFileSelect = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    onFileUpload(type, file);
  }, [onFileUpload]);

  const handleRemove = useCallback((type: FileType) => {
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
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />

        <div className="space-y-6">
          <UploadCard
            title="Planilha Avulsa 1"
            subtitle="Primeira planilha adicional (opcional)"
            required
            file={files.additional1}
            progress={uploadProgress.additional1}
            error={errors.additional1}
            onDrop={(file) => handleDrop('additional1', file)}
            onFileSelect={(e) => handleFileSelect(e, 'additional1')}
            onRemove={() => handleRemove('additional1')}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="w-full max-w-md">
          <Button
            onClick={() => {
              if (!files.main) {
                toast.error('Por favor, faça upload da Planilha Mãe antes de continuar.');
                return;
              }
              onMerge();
            }}
            disabled={!canMerge || isMerging}
            className="w-full gap-2 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-busy={isMerging}
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
