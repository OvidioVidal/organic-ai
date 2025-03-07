'use client'

import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { CameraIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import Quagga from 'quagga'

interface ScannerProps {
  onScanComplete: (result: string) => void
}

export default function Scanner({ onScanComplete }: ScannerProps) {
  const [mode, setMode] = useState<'camera' | 'barcode'>('camera')
  const webcamRef = useRef<Webcam>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode === 'barcode') {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            facingMode: "environment"
          },
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
        }
      }, (err) => {
        if (err) {
          console.error(err)
          return
        }
        Quagga.start()
      })

      Quagga.onDetected((result) => {
        if (result.codeResult) {
          onScanComplete(result.codeResult.code)
          Quagga.stop()
        }
      })

      return () => {
        Quagga.stop()
      }
    }
  }, [mode, onScanComplete])

  const captureImage = async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onScanComplete(imageSrc)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onScanComplete(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          className={`btn ${mode === 'camera' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('camera')}
        >
          <CameraIcon className="h-5 w-5 inline-block mr-2" />
          Camera
        </button>
        <button
          className={`btn ${mode === 'barcode' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('barcode')}
        >
          <QrCodeIcon className="h-5 w-5 inline-block mr-2" />
          Barcode
        </button>
      </div>

      <div className="relative aspect-video">
        {mode === 'camera' ? (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full rounded-lg"
            />
            <button
              className="btn btn-primary absolute bottom-4 left-1/2 transform -translate-x-1/2"
              onClick={captureImage}
            >
              Capture
            </button>
          </>
        ) : (
          <div id="interactive" className="w-full h-full" />
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-2">or</p>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          className="btn btn-outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
      </div>
    </div>
  )
}