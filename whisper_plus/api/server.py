"""
FastAPI server for whisper-plus with web interface support
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional
from pathlib import Path
import tempfile
import os

# TODO: Import when implemented
# from whisper_plus.core.model import WhisperModel

def create_app() -> FastAPI:
    """Create FastAPI application with web interface"""
    
    app = FastAPI(
        title="whisper-plus API",
        description="Enhanced Python wrapper for whisper.cpp with REST API and web interface",
        version="0.1.0"
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Serve web interface (when built)
    web_dist = Path(__file__).parent.parent.parent / "web" / "dist"
    if web_dist.exists():
        app.mount("/static", StaticFiles(directory=str(web_dist / "assets")), name="static")
        
        @app.get("/")
        async def serve_web_interface():
            """Serve the web interface"""
            index_path = web_dist / "index.html"
            if index_path.exists():
                return FileResponse(str(index_path))
            return {"message": "Web interface not built. Run 'npm run build' in the web directory."}
    
    @app.get("/api/health")
    async def health():
        """Health check endpoint"""
        return {
            "status": "healthy",
            "version": "0.1.0",
            "features": {
                "web_interface": web_dist.exists(),
                "transcription": False,  # TODO: Update when implemented
            }
        }
    
    @app.post("/api/transcribe")
    async def transcribe(
        file: UploadFile = File(...),
        model: str = Form("base"),
        language: Optional[str] = Form("auto"),
        with_timestamps: bool = Form(True),
        translate: bool = Form(False),
    ):
        """
        Transcribe audio file
        
        TODO: Implement actual transcription when core functionality is ready
        """
        # Validate file type
        if not file.content_type or not file.content_type.startswith("audio/"):
            # Check file extension as fallback
            ext = Path(file.filename).suffix.lower()
            if ext not in [".mp3", ".wav", ".flac", ".m4a", ".ogg", ".opus"]:
                raise HTTPException(status_code=400, detail="Invalid audio file type")
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        try:
            # TODO: Implement actual transcription
            # model_instance = WhisperModel(model)
            # result = model_instance.transcribe(
            #     tmp_path,
            #     with_timestamps=with_timestamps,
            #     translate=translate,
            #     language=language if language != "auto" else None,
            # )
            
            # Placeholder response
            return JSONResponse({
                "text": "Transcription will be available once core functionality is implemented.",
                "segments": [],
                "language": language if language != "auto" else "en",
                "model": model,
                "status": "placeholder"
            })
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
        finally:
            # Cleanup
            Path(tmp_path).unlink(missing_ok=True)
    
    @app.get("/api/models")
    async def list_models():
        """List available models"""
        return {
            "models": [
                {"id": "tiny", "name": "Tiny", "params": "39M", "description": "Fastest, least accurate"},
                {"id": "base", "name": "Base", "params": "74M", "description": "Good balance"},
                {"id": "small", "name": "Small", "params": "244M", "description": "Better accuracy"},
                {"id": "medium", "name": "Medium", "params": "769M", "description": "High accuracy"},
                {"id": "large", "name": "Large", "params": "1550M", "description": "Best accuracy"},
            ]
        }
    
    return app


def main():
    """CLI entry point for API server"""
    import uvicorn
    
    app = create_app()
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )


if __name__ == "__main__":
    main()

