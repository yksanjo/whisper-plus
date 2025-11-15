function TranscriptionViewer({ transcription, onExport }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(transcription.text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transcription</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="btn-secondary text-sm"
          >
            Copy
          </button>
          <div className="relative">
            <button className="btn-primary text-sm">
              Export ▼
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block">
              <button
                onClick={() => onExport('txt')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                TXT
              </button>
              <button
                onClick={() => onExport('srt')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                SRT
              </button>
              <button
                onClick={() => onExport('vtt')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                VTT
              </button>
              <button
                onClick={() => onExport('json')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Text */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Full Text</h3>
        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <p className="text-gray-900 whitespace-pre-wrap">{transcription.text}</p>
        </div>
      </div>

      {/* Segments with Timestamps */}
      {transcription.segments && transcription.segments.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Segments</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {transcription.segments.map((segment, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 border-l-4 border-primary-500"
              >
                <div className="text-xs text-gray-500 mb-1">
                  {formatTime(segment.start)} → {formatTime(segment.end)}
                </div>
                <p className="text-gray-900">{segment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      {transcription.language && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Language:</span> {transcription.language}
          </div>
          {transcription.duration && (
            <div className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Duration:</span> {formatTime(transcription.duration)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`
}

export default TranscriptionViewer

