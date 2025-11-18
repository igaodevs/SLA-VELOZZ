'use client';

import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Lazy load heavy components with proper typing
const UploadSection = dynamic<{
  files: FileState;
  uploadProgress: UploadProgressState;
  onFileUpload: (type: FileType, file: File | null) => void;
  onMerge: () => void;
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

export default function Home() {
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

  // Handle file upload
  const handleFileUpload = useCallback((type: FileType, file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    setUploadProgress(prev => ({ ...prev, [type]: file ? 100 : 0 }));
  }, []);

  // Handle merge functionality
  const handleMerge = useCallback(() => {
    // This function will be implemented with actual file processing logic
    // For now, we'll set an empty array to indicate no data is available
    setMergedData([]);
    
    // Scroll to results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [applyMeliFilter]);

  // Memoize the header and footer to prevent unnecessary re-renders
  const memoizedHeader = <MemoizedHeader />;
  const memoizedFooter = <MemoizedFooter />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ErrorBoundary>
        {memoizedHeader}
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                  Mescle suas planilhas <span className="text-primary">em segundos</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                  Plataforma profissional para fusão de planilhas Excel. Rápido, simples e intuitivo. Suporte a arquivos grandes.
                </p>
              </div>
            </div>
          </section>

          {/* Upload Section */}
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
              />
            </Suspense>
          </ErrorBoundary>

          {/* Preview Section */}
          {(files.main || files.additional1) && (
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
          )}

          {/* Results Section */}
          {mergedData && (
            <div id="results-section">
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
            </div>
          )}

          {/* Charts Section */}
          {showCharts && mergedData && (
            <ErrorBoundary>
              <Suspense fallback={
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              }>
                <ChartsSection 
                  data={mergedData}
                  onClose={() => setShowCharts(false)}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </main>

        {memoizedFooter}
      </ErrorBoundary>
    </div>
  )
}
