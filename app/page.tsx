'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { UploadSection } from '@/components/upload-section'
import { PreviewSection } from '@/components/preview-section'
import { ResultsSection } from '@/components/results-section'
import { ChartsSection } from '@/components/charts-section'

export default function Home() {
  const [files, setFiles] = useState<{
    main: File | null
    additional1: File | null
    additional2: File | null
  }>({
    main: null,
    additional1: null,
    additional2: null,
  })

  const [uploadProgress, setUploadProgress] = useState<{
    main: number
    additional1: number
    additional2: number
  }>({
    main: 0,
    additional1: 0,
    additional2: 0,
  })

  const [mergedData, setMergedData] = useState<any[] | null>(null)
  const [showCharts, setShowCharts] = useState(false)
  const [applyMeliFilter, setApplyMeliFilter] = useState(true)

  const handleFileUpload = (type: 'main' | 'additional1' | 'additional2', file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }))
    
    // Simulate upload progress for large files
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(prev => ({ ...prev, [type]: progress }))
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 200)
  }

  const handleMerge = () => {
    const mockData = [
      { id: 1, vendedor: 'João Silva', data: '2024-01-15', status: 'Atrasado', dias: 3, categoria: 'Meli' },
      { id: 2, vendedor: 'Maria Santos', data: '2024-01-16', status: 'No Prazo', dias: 0, categoria: 'Meli' },
      { id: 3, vendedor: 'Pedro Costa', data: '2024-01-17', status: 'Atrasado', dias: 5, categoria: 'Meli' },
      { id: 4, vendedor: 'Ana Lima', data: '2024-01-18', status: 'No Prazo', dias: 0, categoria: 'Meli' },
      { id: 5, vendedor: 'João Silva', data: '2024-01-19', status: 'Atrasado', dias: 2, categoria: 'Meli' },
      { id: 6, vendedor: 'Carlos Mendes', data: '2024-01-20', status: 'Atenção', dias: 1, categoria: 'Meli' },
      { id: 7, vendedor: 'Juliana Reis', data: '2024-01-21', status: 'No Prazo', dias: 0, categoria: 'Meli' },
      { id: 8, vendedor: 'Pedro Costa', data: '2024-01-22', status: 'Atrasado', dias: 4, categoria: 'Meli' },
    ]
    
    const filteredData = applyMeliFilter 
      ? mockData.filter(item => item.categoria === 'Meli')
      : mockData
    
    setMergedData(filteredData)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
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
        <UploadSection 
          files={files}
          uploadProgress={uploadProgress}
          onFileUpload={handleFileUpload}
          onMerge={handleMerge}
        />

        {/* Preview Section */}
        {(files.main || files.additional1) && (
          <PreviewSection 
            files={files}
            applyMeliFilter={applyMeliFilter}
            onFilterChange={setApplyMeliFilter}
          />
        )}

        {/* Results Section */}
        {mergedData && (
          <ResultsSection 
            data={mergedData}
            onShowCharts={() => setShowCharts(true)}
          />
        )}

        {/* Charts Section */}
        {showCharts && mergedData && (
          <ChartsSection 
            data={mergedData}
            onClose={() => setShowCharts(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
