# whisper-plus 🎤

> An enhanced Python wrapper for [whisper.cpp](https://github.com/ggerganov/whisper.cpp) with REST API, async processing, batch operations, and modern tooling for AI/creator applications.

## Why whisper-plus?

[whisper.cpp](https://github.com/ggerganov/whisper.cpp) is an excellent C++ implementation of OpenAI's Whisper, but it lacks modern Python tooling. **whisper-plus** adds:

- ✅ **REST API** - FastAPI-based server for easy integration
- ✅ **Async Processing** - Non-blocking transcription for web apps
- ✅ **Batch Operations** - Process multiple files efficiently
- ✅ **Progress Tracking** - Real-time progress updates
- ✅ **WebSocket Support** - Live streaming transcription
- ✅ **CLI Tools** - Easy-to-use command-line interface
- ✅ **Workflow Integration** - Works seamlessly with pydub-plus
- ✅ **YouTube/TikTok Support** - Direct transcription from URLs

## 🚀 Features

### 1. Simple Python API
```python
from whisper_plus import WhisperModel

# Load model
model = WhisperModel("base")

# Transcribe audio file
result = model.transcribe("audio.mp3")
print(result.text)

# Get detailed segments
for segment in result.segments:
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
```

### 2. Async Processing
Perfect for web applications and async workflows:
```python
import asyncio
from whisper_plus.async_ops import WhisperModelAsync

async def main():
    model = await WhisperModelAsync.create("base")
    
    # Transcribe asynchronously
    result = await model.transcribe_async("audio.mp3")
    print(result.text)
    
    # Batch processing
    files = ["audio1.mp3", "audio2.mp3", "audio3.mp3"]
    results = await model.transcribe_batch_async(files)
    
    for file, result in zip(files, results):
        print(f"{file}: {result.text}")

asyncio.run(main())
```

### 3. REST API Server
Start a FastAPI server for HTTP access:
```bash
# Start the API server
whisper-plus-api

# Transcribe via HTTP
curl -X POST http://localhost:8000/api/transcribe \
  -F "file=@audio.mp3" \
  -F "model=base"

# Get transcription with timestamps
curl -X POST http://localhost:8000/api/transcribe \
  -F "file=@audio.mp3" \
  -F "model=base" \
  -F "with_timestamps=true"
```

### 4. WebSocket Streaming
Real-time transcription for live audio:
```python
from whisper_plus.websocket import WhisperWebSocketServer

# Start WebSocket server
server = WhisperWebSocketServer(model="base", port=8765)
await server.start()

# Client connects and streams audio chunks
# Server returns transcription in real-time
```

### 5. Batch Processing
Process multiple files efficiently:
```python
from whisper_plus.batch import BatchProcessor

processor = BatchProcessor(model="base")

# Process directory
results = processor.process_directory(
    input_dir="./audio_files",
    output_dir="./transcriptions",
    format="json"  # json, srt, vtt, txt
)

# Process with progress tracking
for result in processor.process_with_progress(files):
    print(f"Processed: {result.file} - {result.status}")
```

### 6. CLI Tools
Easy command-line interface:
```bash
# Transcribe a single file
whisper-plus transcribe audio.mp3 --model base

# Transcribe with timestamps (SRT format)
whisper-plus transcribe audio.mp3 --output subtitles.srt --format srt

# Batch process directory
whisper-plus batch --input-dir ./audio --output-dir ./transcriptions

# Transcribe from YouTube URL
whisper-plus youtube "https://youtube.com/watch?v=..." --model base

# Live transcription (WebSocket)
whisper-plus stream --model base --port 8765
```

### 7. Integration with pydub-plus
Seamless workflow integration:
```python
from pydub_plus import AudioSegment
from whisper_plus import WhisperModel

# Process audio with pydub-plus, then transcribe
audio = AudioSegment.from_file("input.mp3")
normalized = audio.normalize()
normalized.export("normalized.mp3")

# Transcribe with whisper-plus
model = WhisperModel("base")
result = model.transcribe("normalized.mp3")
print(result.text)
```

## 📦 Installation

### Prerequisites
- Python 3.9+
- whisper.cpp (will be installed automatically)
- FFmpeg (for audio format support)

### Basic Installation
```bash
pip install whisper-plus
```

### With All Features
```bash
pip install whisper-plus[all]
```

### From Source
```bash
git clone https://github.com/YOUR_USERNAME/whisper-plus.git
cd whisper-plus
pip install -e .
```

## 🎯 Quick Start

### 1. Basic Transcription
```python
from whisper_plus import WhisperModel

model = WhisperModel("base")  # or tiny, small, medium, large
result = model.transcribe("audio.mp3")
print(result.text)
```

### 2. With Timestamps
```python
result = model.transcribe("audio.mp3", with_timestamps=True)

# Export as SRT
result.export_srt("subtitles.srt")

# Export as VTT
result.export_vtt("subtitles.vtt")

# Export as JSON
result.export_json("transcription.json")
```

### 3. REST API
```bash
# Start server
whisper-plus-api --model base --port 8000

# In another terminal
curl -X POST http://localhost:8000/api/transcribe \
  -F "file=@audio.mp3"
```

### 4. Batch Processing
```bash
whisper-plus batch \
  --input-dir ./audio \
  --output-dir ./transcriptions \
  --model base \
  --format json
```

## 📚 API Reference

### WhisperModel
Main transcription model class.

```python
model = WhisperModel(
    model_size="base",  # tiny, base, small, medium, large
    device="cpu",       # cpu, cuda (if available)
    num_threads=4,      # Number of threads
    language=None       # Auto-detect or specify (en, es, fr, etc.)
)

result = model.transcribe(
    audio_path,
    with_timestamps=False,
    translate=False,    # Translate to English
    language=None,
    temperature=0.0
)
```

### WhisperModelAsync
Async version for non-blocking operations.

```python
model = await WhisperModelAsync.create("base")
result = await model.transcribe_async(audio_path)
```

### BatchProcessor
Efficient batch processing with progress tracking.

```python
processor = BatchProcessor(model="base")
results = processor.process_directory(
    input_dir="./audio",
    output_dir="./output",
    format="json",
    num_workers=4
)
```

## 🔧 Configuration

### Model Sizes
- `tiny` - Fastest, least accurate (~39M params)
- `base` - Good balance (~74M params)
- `small` - Better accuracy (~244M params)
- `medium` - High accuracy (~769M params)
- `large` - Best accuracy (~1550M params)

### Supported Languages
Auto-detection supported, or specify: `en`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `ja`, `ko`, `zh`, and [many more](https://github.com/openai/whisper#available-models-and-languages).

## 🚀 Advanced Features

### Custom Audio Processing
```python
from whisper_plus import WhisperModel
from pydub_plus import AudioSegment

# Pre-process audio
audio = AudioSegment.from_file("input.mp3")
audio = audio.normalize().high_pass_filter(80)

# Transcribe processed audio
model = WhisperModel("base")
result = model.transcribe_from_audio_segment(audio)
```

### Progress Callbacks
```python
def on_progress(progress: float, status: str):
    print(f"Progress: {progress:.1f}% - {status}")

result = model.transcribe(
    "long_audio.mp3",
    on_progress=on_progress
)
```

### WebSocket Streaming
```python
# Server
from whisper_plus.websocket import WhisperWebSocketServer

server = WhisperWebSocketServer(model="base")
await server.start()

# Client (example)
import websockets
import json

async with websockets.connect("ws://localhost:8765") as ws:
    # Send audio chunks
    await ws.send(audio_chunk)
    # Receive transcription
    result = await ws.recv()
```

## 🔗 Integration Examples

### With FastAPI
```python
from fastapi import FastAPI, UploadFile, File
from whisper_plus import WhisperModel

app = FastAPI()
model = WhisperModel("base")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    result = await model.transcribe_async(file.file)
    return {"text": result.text, "segments": result.segments}
```

### With pydub-plus Workflows
```python
from pydub_plus.workflows import YouTubeProcessor
from whisper_plus import WhisperModel

# Download and process YouTube audio
youtube = YouTubeProcessor()
audio = await youtube.download_audio("https://youtube.com/watch?v=...")

# Transcribe
model = WhisperModel("base")
result = await model.transcribe_async(audio)
print(result.text)
```

## 📊 Performance

- **CPU**: ~1-2x real-time (base model)
- **GPU**: ~10-20x real-time (with CUDA)
- **Batch**: Processes multiple files in parallel

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) - The amazing C++ implementation
- [OpenAI Whisper](https://github.com/openai/whisper) - The original model
- [pydub-plus](https://github.com/YOUR_USERNAME/pydub-plus) - Inspiration for the structure

## 🔗 Related Projects

- [pydub-plus](https://github.com/YOUR_USERNAME/pydub-plus) - Enhanced audio processing
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) - Original C++ implementation

---

**Made with ❤️ for the open source community**

