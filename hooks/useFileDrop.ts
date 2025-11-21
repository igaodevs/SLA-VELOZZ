import { useState, useCallback } from 'react';

export interface UseFileDropOptions {
  onDrop: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
}

export function useFileDrop({ 
  onDrop, 
  acceptedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], 
  maxSize = 10 * 1024 * 1024 // 10MB default
}: UseFileDropOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): boolean => {
    if (acceptedTypes.length > 0 && !acceptedTypes.some(type => file.type === type || file.name.endsWith(type))) {
      setError(`Tipo de arquivo não suportado. Tipos permitidos: ${acceptedTypes.join(', ')}`);
      return false;
    }

    if (file.size > maxSize) {
      setError(`Arquivo muito grande. O tamanho máximo permitido é ${maxSize / (1024 * 1024)}MB`);
      return false;
    }

    setError(null);
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
    setError(null);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onDrop(file);
    }
  }, [onDrop, validateFile]);

  return {
    isDragging,
    error,
    dragProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    }
  };
}
