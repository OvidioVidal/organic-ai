'use client'

import { useState } from 'react'
import Scanner from '@/components/Scanner'
import ProductAnalysis from '@/components/ProductAnalysis'

export default function Home() {
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleScanComplete = async (result: string) => {
    setScanResult(result)
    setIsAnalyzing(true)
    // Additional logic for analyzing the product will be added here
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Organic AI
        </h1>
        <p className="text-xl text-gray-600">
          Discover healthier alternatives with cleaner ingredients
        </p>
      </header>

      <div className="card">
        {!scanResult ? (
          <Scanner onScanComplete={handleScanComplete} />
        ) : (
          <ProductAnalysis 
            scanResult={scanResult}
            isAnalyzing={isAnalyzing}
            onReset={() => {
              setScanResult(null)
              setIsAnalyzing(false)
            }}
          />
        )}
      </div>
    </div>
  )
}