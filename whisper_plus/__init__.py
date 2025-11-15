"""
whisper-plus: Enhanced Python wrapper for whisper.cpp

A modern Python interface for whisper.cpp with REST API, async processing,
batch operations, and workflow integrations.
"""

__version__ = "0.1.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"

from whisper_plus.core.model import WhisperModel
from whisper_plus.core.result import TranscriptionResult

__all__ = [
    "WhisperModel",
    "TranscriptionResult",
]

