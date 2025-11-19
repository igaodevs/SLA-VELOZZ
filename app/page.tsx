"use client";

import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Lazy load heavy components with proper typing
const UploadSection = dynamic<{
  files: FileState;
  uploadProgress: UploadProgressState;
  onFileUpload: (type: FileType, file: File | null) => void;
  onMerge: () => void;
  isMerging: boolean;
}>(() => import('@/components/upload-section').then(mod => mod.UploadSection), {
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
  const { scrollYProgress } = useScroll()
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, 80])

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

  // Handle file upload
  const handleFileUpload = useCallback((type: FileType, file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    setUploadProgress(prev => ({ ...prev, [type]: file ? 100 : 0 }));
  }, []);

  // Helper para fazer upload de um arquivo individual
  const uploadSingleFile = useCallback(async (file: File, type: 'main' | 'additional1' | 'additional2'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    // Mapeia o tipo de arquivo do frontend para o enum do backend
    const backendType =
      type === 'main'
        ? 'mother'
        : type === 'additional1'
          ? 'single_1'
          : 'single_2';

    const res = await fetch(`${API_BASE_URL}/api/v1/upload/${backendType}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || 'Erro ao enviar arquivo');
    }

    const data = await res.json();
    return data.file_id as string;
  }, []);

  // Handle merge functionality (faz upload e chama o backend)
  const handleMerge = useCallback(async () => {
    if (!files.main || !files.additional1) return;

    setIsMerging(true);
    setMergedData(null);

    try {
      // 1) Upload dos arquivos necessários
      const motherId = await uploadSingleFile(files.main, 'main');

      const singleIds: string[] = [];
      if (files.additional1) {
        const id1 = await uploadSingleFile(files.additional1, 'additional1');
        singleIds.push(id1);
      }
      if (files.additional2) {
        const id2 = await uploadSingleFile(files.additional2, 'additional2');
        singleIds.push(id2);
      }

      // 2) Chama o endpoint de merge
      const mergeRes = await fetch(`${API_BASE_URL}/api/v1/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mother_file_id: motherId,
          single_file_ids: singleIds,
          options: {
            apply_meli_filter: applyMeliFilter,
          },
        }),
      });

      if (!mergeRes.ok) {
        const errorBody = await mergeRes.json().catch(() => ({}));
        throw new Error(errorBody.detail || 'Erro ao mesclar arquivos');
      }

      const mergeData = await mergeRes.json();

      // Usa preview_data se disponível, senão mantém estrutura vazia
      const preview = Array.isArray(mergeData.preview_data) ? mergeData.preview_data : [];
      setMergedData(preview);

      // Scroll para a seção de resultados
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Falha ao mesclar planilhas');
    } finally {
      setIsMerging(false);
    }
  }, [API_BASE_URL, files, applyMeliFilter, uploadSingleFile]);

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
                  isMerging={isMerging}
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
                    data={mergedData}
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
                    data={mergedData}
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
