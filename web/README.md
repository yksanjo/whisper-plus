# whisper-plus Web Interface

Modern, user-friendly web interface for whisper-plus transcription.

## Features

- 🎨 **Beautiful UI** - Modern, responsive design
- 📤 **Drag & Drop** - Easy file upload
- ⚡ **Real-time Progress** - Live transcription updates
- 📝 **Live Preview** - See transcription as it happens
- 💾 **Multiple Export Formats** - SRT, VTT, TXT, JSON
- 📦 **Batch Processing** - Process multiple files
- 🎛️ **Model Selection** - Choose model size
- 🌍 **Language Support** - Auto-detect or select language
- 📊 **Quality Metrics** - Confidence scores and quality indicators

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Real-time**: WebSocket for progress
- **Backend**: FastAPI (whisper-plus API)

## Development

```bash
cd web
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Production

The web interface is served by the FastAPI backend when running in production mode.

