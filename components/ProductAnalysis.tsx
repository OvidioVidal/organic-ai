'use client'

import { useState, useEffect } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ProductAnalysisProps {
  scanResult: string
  isAnalyzing: boolean
  onReset: () => void
}

interface Product {
  name: string
  ingredients: string[]
  healthScore: number
  alternatives: Alternative[]
}

interface Alternative {
  name: string
  ingredients: string[]
  healthScore: number
  reasons: string[]
}

export default function ProductAnalysis({
  scanResult,
  isAnalyzing,
  onReset,
}: ProductAnalysisProps) {
  const [analysis, setAnalysis] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const analyzeProduct = async () => {
      try {
        // First, upload the image to Cloudinary
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: scanResult }),
        })
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image')
        
        const { url } = await uploadResponse.json()

        // Then, analyze the image using OpenAI
        const analysisResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: url }),
        })

        if (!analysisResponse.ok) throw new Error('Failed to analyze product')
        
        const data = await analysisResponse.json()
        setAnalysis(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    if (isAnalyzing) {
      analyzeProduct()
    }
  }, [scanResult, isAnalyzing])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button className="btn btn-primary" onClick={onReset}>
          Try Again
        </button>
      </div>
    )
  }

  if (isAnalyzing && !analysis) {
    return (
      <div className="text-center py-8">
        <ArrowPathIcon className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-gray-600">Analyzing product...</p>
      </div>
    )
  }

  if (!analysis) return null

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {analysis.name}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-gray-600">
              Health Score:
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full mx-0.5 ${
                    i < Math.round(analysis.healthScore / 2)
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline"
          onClick={onReset}
        >
          Scan Another
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Ingredients:
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          {analysis.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Healthier Alternatives:
        </h3>
        <div className="space-y-4">
          {analysis.alternatives.map((alt, index) => (
            <div key={index} className="card bg-green-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-800">
                  {alt.name}
                </h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full mx-0.5 ${
                        i < Math.round(alt.healthScore / 2)
                          ? 'bg-primary'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                <strong>Why it&apos;s better:</strong>
                <ul className="list-disc list-inside mt-1">
                  {alt.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Ingredients:</strong>
                <p className="mt-1">{alt.ingredients.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}