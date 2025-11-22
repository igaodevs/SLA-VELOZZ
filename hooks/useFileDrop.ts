import { useState, useCallback } from 'react';

// Mapeamento de tipos MIME para extensões
const MIME_TYPES: Record<string, string[]> = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'text/csv': ['.csv']
};

export interface UseFileDropOptions {
  onDrop: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
}

export function useFileDrop({ 
  onDrop, 
  acceptedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], 
  maxSize = 100 * 1024 * 1024 // Aumentado para 100MB
}: UseFileDropOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  };

  const validateFile = useCallback((file: File): boolean => {
    // Reset error state
    setError(null);

    // Verifica se o tipo do arquivo é válido
    const isValidType = acceptedTypes.some(type => {
      // Verifica pelo tipo MIME
      if (file.type === type) return true;
      
      // Verifica pela extensão do arquivo
      const fileExt = getFileExtension(file.name);
      const validExtensions = MIME_TYPES[type] || [];
      return validExtensions.some(ext => `.${fileExt}` === ext);
    });

    if (!isValidType) {
      const allowedExtensions = acceptedTypes.flatMap(type => 
        MIME_TYPES[type] || []
      ).join(', ');
      
      setError(`Tipo de arquivo não suportado. Use: ${allowedExtensions || 'arquivos Excel (.xlsx, .xls)'}`);
      return false;
    }

    // Verifica o tamanho do arquivo
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setError(`Arquivo muito grande (${fileSizeMB}MB). Tamanho máximo: ${maxSizeMB}MB`);
      return false;
    }

    // Verifica se o arquivo não está vazio
    if (file.size === 0) {
      setError('O arquivo está vazio');
      return false;
    }

    return true;
  }, [acceptedTypes, maxSize]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    
    // Verifica se há arquivos
    if (!files || files.length === 0) {
      setError('Nenhum arquivo encontrado');
      return;
    }
    
    // Apenas o primeiro arquivo é processado
    const file = files[0];
    
    // Valida o arquivo
    if (validateFile(file)) {
      try {
        onDrop(file);
      } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        setError('Erro ao processar o arquivo. Tente novamente.');
      }
    }
  }, [onDrop, validateFile]);

  return {
    isDragging,
    error,
    resetError: useCallback(() => setError(null), []),
    dragProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    }
  };
}
