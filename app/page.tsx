"use client";

import { useState, useCallback, useMemo, Suspense, useTransition, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { isMeliRecord } from '@/lib/utils';
import { toast } from 'sonner';

// Lazy load heavy components with proper typing
const UploadSection = dynamic<{
  files: FileState;
  uploadProgress: UploadProgressState;
  onFileUpload: (type: FileType, file: File | null) => void;
  onMerge: () => Promise<void>;
  isMerging: boolean;
}>(() => import('@/components/upload-section-improved').then(mod => mod.UploadSection), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
  ssr: false,
});

const PreviewSection = dynamic<{
  files: FileState;
  applyMeliFilter: boolean;
  onFilterChange: (value: boolean) => void;
}>(() => import('@/components/preview-section').then(mod => mod.PreviewSection), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  ),
});

const ResultsSection = dynamic<{
  data: any[];
  onShowCharts: () => void;
}>(() => import('@/components/results-section').then(mod => mod.ResultsSection), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
});

const ChartsSection = dynamic<{
  data: any[];
  onClose: () => void;
}>(() => import('@/components/charts-section').then(mod => mod.ChartsSection), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  ),
});

// Define types for better type safety
type FileType = 'main' | 'additional1' | 'additional2';

interface FileState {
  main: File | null;
  additional1: File | null;
  additional2: File | null;
}

interface UploadProgressState {
  main: number;
  additional1: number;
  additional2: number;
}

// Import memo from React
import { memo } from 'react';

// Memoized component to avoid unnecessary re-renders
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.12, 0.18, 0.98],
    },
  },
} as const;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [files, setFiles] = useState<FileState>({
    main: null,
    additional1: null,
    additional2: null,
  });

  const [uploadProgress, setUploadProgress] = useState<UploadProgressState>({
    main: 0,
    additional1: 0,
    additional2: 0,
  });

  const [mergedData, setMergedData] = useState<any[] | null>(null);
  const [showCharts, setShowCharts] = useState(false);
  const [applyMeliFilter, setApplyMeliFilter] = useState(true);
  const [isMerging, setIsMerging] = useState(false);
  const [isFilteringPending, startFilteringTransition] = useTransition();
  const isMergeBusy = isMerging || isFilteringPending;

  const displayedData = useMemo(() => {
    if (!mergedData) return null;
    const baseData = applyMeliFilter
      ? mergedData.filter((row) => isMeliRecord(row as Record<string, unknown>))
      : mergedData;

    const delayedOnly = baseData.filter((row) => {
      if (!row || typeof row !== 'object') return false;
      const typedRow = row as Record<string, any>;
      if (typedRow.fora_do_prazo === true) return true;
      const statusValue = String(typedRow.status ?? '').toLowerCase();
      return statusValue.includes('atras');
    });

    return delayedOnly.length > 0 ? delayedOnly : baseData;
  }, [mergedData, applyMeliFilter]);

  // Handle file upload
  const handleFileUpload = useCallback((type: FileType, file: File | null) => {
    setFiles(prev => {
      // Se o arquivo for o mesmo, não faz nada
      if (prev[type] === file) return prev;
      // Se estiver substituindo um arquivo, reseta o progresso
      if (prev[type] && file) {
        setUploadProgress(prevProgress => ({ ...prevProgress, [type]: 0 }));
      }
      return { ...prev, [type]: file };
    });
    
    // Se for uma remoção de arquivo, reseta o progresso
    if (!file) {
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    }
  }, []);

  // Helper para fazer upload de um arquivo individual
  const uploadSingleFile = useCallback(
    async (file: File, type: FileType): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);

      const backendType =
        type === 'main'
          ? 'mother'
          : type === 'additional1'
            ? 'single_1'
            : 'single_2';

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_BASE_URL}/api/v1/upload/${backendType}`, true);

        // Configura o timeout para 5 minutos (300000 ms)
        xhr.timeout = 300000;
        
        // Inicia com 5% para mostrar que o upload começou
        setUploadProgress(prev => ({ ...prev, [type]: 5 }));

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            // Calcula o progresso entre 5% e 95% (deixa 5% para a conclusão)
            const percentage = 5 + Math.round((event.loaded / event.total) * 90);
            setUploadProgress(prev => ({
              ...prev,
              [type]: Math.min(percentage, 95) // Não ultrapassa 95% até a conclusão
            }));
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          
          // Marca como 100% quando o upload for concluído com sucesso
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadProgress(prev => ({ ...prev, [type]: 100 }));
            try {
              const parsed = JSON.parse(xhr.responseText);
              resolve(parsed.file_id as string);
            } catch (error) {
              console.error('Erro ao processar resposta do servidor:', error);
              reject(new Error('Resposta inválida do servidor'));
            }
          } else {
            let detail = 'Erro ao enviar arquivo';
            try {
              const parsed = JSON.parse(xhr.responseText);
              detail = parsed.detail || parsed.message || detail;
            } catch (e) {
              console.error('Erro ao processar mensagem de erro:', e);
            }
            
            // Reseta o progresso em caso de erro
            setUploadProgress(prev => ({ ...prev, [type]: 0 }));
            reject(new Error(detail));
          }
        };

        xhr.ontimeout = () => {
          setUploadProgress(prev => ({ ...prev, [type]: 0 }));
          reject(new Error('Tempo limite de conexão excedido. Tente novamente.'));
        };

        xhr.onerror = () => {
          setUploadProgress(prev => ({ ...prev, [type]: 0 }));
          reject(new Error('Erro de conexão com o servidor. Verifique sua internet e tente novamente.'));
        };

        try {
          xhr.send(formData);
        } catch (error) {
          setUploadProgress(prev => ({ ...prev, [type]: 0 }));
          reject(new Error('Falha ao enviar o arquivo. Tente novamente.'));
        }
      });
    },
    []
  );

  // Função para mesclar as planilhas
  const handleMerge = useCallback(async () => {
    if (!files.main || !files.additional1) return;

    setIsMerging(true);
    setMergedData(null);
    let toastId: string | number = '';

    try {
      // Mostrar notificação de início do processo
      toastId = toast.loading('Iniciando processamento das planilhas...');
      
      // Fazer upload dos arquivos
      toast.loading('Enviando arquivos para o servidor...', { id: toastId });

      const fileIds = await Promise.all(
        Object.entries(files).map(async ([type, file]) => {
          if (!file) return null;
          try {
            const fileId = await uploadSingleFile(file, type as FileType);
            return fileId;
          } catch (error) {
            console.error(`Erro ao enviar arquivo ${type}:`, error);
            throw new Error(`Falha ao enviar ${type === 'main' ? 'Planilha Mãe' : 'Planilha ' + type}. ${error instanceof Error ? error.message : 'Tente novamente.'}`);
          }
        })
      );

      // Extrair o ID do arquivo principal (main) e os IDs adicionais
      const mainFileId = fileIds[0]; // Assumindo que o primeiro arquivo é sempre o principal
      const additionalFileIds = fileIds.slice(1).filter(Boolean) as string[];
      
      if (!mainFileId || additionalFileIds.length === 0) {
        throw new Error('É necessário enviar pelo menos um arquivo principal e um arquivo adicional');
      }

      // Chamar a API para mesclar
      toast.loading('Processando e mesclando planilhas...', { id: toastId });

      const response = await fetch(`${API_BASE_URL}/api/v1/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mother_file_id: mainFileId,
          single_file_ids: additionalFileIds,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao processar as planilhas';
        try {
          const errorData = await response.json();
          console.error('Error details:', errorData);
          
          if (response.status === 422) {
            // Handle validation errors
            if (Array.isArray(errorData.detail)) {
              errorMessage = errorData.detail
                .map((err: any) => `${err.loc ? err.loc.join('.') + ': ' : ''}${err.msg}`)
                .join('; ');
            } else if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            }
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      if (!result || !result.data) {
        throw new Error('Dados inválidos retornados do servidor');
      }

      // Atualizar os dados mesclados
      setMergedData(result.data);
      
      // Mostrar notificação de sucesso
      toast.success('Planilhas mescladas com sucesso!', { id: toastId });
      
      // Rolar até a seção de resultados
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (error) {
      console.error('Erro ao mesclar planilhas:', error);
      
      // Extrai a mensagem de erro de forma segura
      let errorMessage = 'Ocorreu um erro ao processar as planilhas. Por favor, tente novamente.';
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        // Handle case where error is an object but not an Error instance
        if ('message' in error) {
          errorMessage = String(error.message);
        } else {
          errorMessage = JSON.stringify(error);
        }
      }
      
      // Mostrar notificação de erro
      toast.error(errorMessage, { 
        id: toastId,
        position: 'top-center',
        duration: 5000,
      });
      
      // Resetar progresso em caso de erro
      setUploadProgress({
        main: files.main ? 0 : uploadProgress.main,
        additional1: files.additional1 ? 0 : uploadProgress.additional1,
        additional2: files.additional2 ? 0 : uploadProgress.additional2,
      });
    } finally {
      setIsMerging(false);
    }
    }, [files, uploadSingleFile, uploadProgress]);

  // Memoize the header and footer to prevent unnecessary re-renders
  const memoizedHeader = <MemoizedHeader />;
  const memoizedFooter = <MemoizedFooter />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ErrorBoundary>
        {memoizedHeader}
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b">
            <motion.div
              className="bg-gradient-to-br from-background via-background to-primary/5"
              style={{ y: heroTranslateY }}
            >
            <div className="container mx-auto px-4 py-16 md:py-24">
              <motion.div
                className="max-w-3xl mx-auto text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={heroTextVariants}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                  Mescle suas planilhas <span className="text-primary">em segundos</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                  Plataforma profissional para fusão de planilhas Excel. Rápido, simples e intuitivo. Suporte a arquivos grandes.
                </p>
              </motion.div>
            </div>
            </motion.div>
          </section>

          {/* Upload Section */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ErrorBoundary fallback={
              <div className="container mx-auto px-4 py-12">
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-destructive mb-2">Erro ao carregar o upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Ocorreu um erro ao carregar a seção de upload. Por favor, recarregue a página e tente novamente.
                  </p>
                </div>
              </div>
            }>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              }>
                <UploadSection 
                  files={files}
                  uploadProgress={uploadProgress}
                  onFileUpload={handleFileUpload}
                  onMerge={handleMerge}
                  isMerging={isMergeBusy}
                />
              </Suspense>
            </ErrorBoundary>
          </motion.section>

          {/* Preview Section */}
          {(files.main || files.additional1) && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                }>
                  <PreviewSection 
                    files={files}
                    applyMeliFilter={applyMeliFilter}
                    onFilterChange={setApplyMeliFilter}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.section>
          )}

          {/* Results Section */}
          {mergedData && (
            <motion.div
              id="results-section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[300px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                }>
                  <ResultsSection 
                    data={displayedData ?? []}
                    onShowCharts={() => setShowCharts(true)}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}

          {/* Charts Section */}
          {showCharts && mergedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  </div>
                }>
                  <ChartsSection 
                    data={displayedData ?? []}
                    onClose={() => setShowCharts(false)}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}
        </main>

        {memoizedFooter}
      </ErrorBoundary>
    </div>
  )
}
