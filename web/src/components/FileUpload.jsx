import { useCallback } from 'react'

function FileUpload({ file, onFileSelect, disabled }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    const audioFile = files.find(f => f.type.startsWith('audio/') || f.name.match(/\.(mp3|wav|flac|m4a|ogg|opus)$/i))
    
    if (audioFile) {
      onFileSelect(audioFile)
    } else {
      alert('Please upload an audio file')
    }
  }, [onFileSelect, disabled])

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Upload Audio</h2>
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          disabled
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50 cursor-pointer'
        }`}
      >
        {file ? (
          <div className="space-y-2">
            <div className="text-4xl mb-2">🎵</div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            {!disabled && (
              <button
                onClick={() => onFileSelect(null)}
                className="text-sm text-primary-600 hover:text-primary-700 mt-2"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-2">📤</div>
            <p className="text-gray-600 mb-2">
              Drag and drop an audio file here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="btn-primary inline-block cursor-pointer">
              Browse Files
              <input
                type="file"
                accept="audio/*,.mp3,.wav,.flac,.m4a,.ogg,.opus"
                onChange={handleFileInput}
                className="hidden"
                disabled={disabled}
              />
            </label>
            <p className="text-xs text-gray-400 mt-4">
              Supports: MP3, WAV, FLAC, M4A, OGG, OPUS
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload

