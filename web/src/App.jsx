import { useState } from 'react'
import FileUpload from './components/FileUpload'
import TranscriptionViewer from './components/TranscriptionViewer'
import SettingsPanel from './components/SettingsPanel'
import ProgressBar from './components/ProgressBar'
import Header from './components/Header'

function App() {
  const [file, setFile] = useState(null)
  const [transcription, setTranscription] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [settings, setSettings] = useState({
    model: 'base',
    language: 'auto',
    withTimestamps: true,
    translate: false,
  })

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setTranscription(null)
    setProgress(0)
  }

  const handleTranscribe = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setTranscription(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model', settings.model)
      formData.append('language', settings.language)
      formData.append('with_timestamps', settings.withTimestamps.toString())
      formData.append('translate', settings.translate.toString())

      // Simulate progress (replace with actual WebSocket connection)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Transcription failed')
      }

      const result = await response.json()
      setTranscription(result)
    } catch (error) {
      console.error('Transcription error:', error)
      alert('Transcription failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExport = (format) => {
    if (!transcription) return

    // TODO: Implement export functionality
    console.log(`Exporting as ${format}`, transcription)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Settings */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload
              file={file}
              onFileSelect={handleFileSelect}
              disabled={isProcessing}
            />
            
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              disabled={isProcessing}
            />
            
            <button
              onClick={handleTranscribe}
              disabled={!file || isProcessing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Transcribing...' : 'Start Transcription'}
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {isProcessing && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Processing...</h2>
                <ProgressBar progress={progress} />
              </div>
            )}

            {transcription && (
              <TranscriptionViewer
                transcription={transcription}
                onExport={handleExport}
              />
            )}

            {!isProcessing && !transcription && file && (
              <div className="card text-center text-gray-500">
                <p>Click "Start Transcription" to begin</p>
              </div>
            )}

            {!file && (
              <div className="card text-center text-gray-500">
                <p>Upload an audio file to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

