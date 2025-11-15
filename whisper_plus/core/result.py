"""
TranscriptionResult: Represents the result of a transcription operation
"""

from dataclasses import dataclass
from typing import List, Optional, Dict, Any
from pathlib import Path
import json


@dataclass
class Segment:
    """A single segment of transcribed text with timestamps"""

    start: float
    end: float
    text: str
    tokens: Optional[List[int]] = None
    no_speech_prob: Optional[float] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert segment to dictionary"""
        result = {
            "start": self.start,
            "end": self.end,
            "text": self.text,
        }
        if self.tokens is not None:
            result["tokens"] = self.tokens
        if self.no_speech_prob is not None:
            result["no_speech_prob"] = self.no_speech_prob
        return result


@dataclass
class TranscriptionResult:
    """Result of a transcription operation"""

    text: str
    segments: List[Segment]
    language: Optional[str] = None
    language_probs: Optional[Dict[str, float]] = None
    duration: Optional[float] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert result to dictionary"""
        result = {
            "text": self.text,
            "segments": [seg.to_dict() for seg in self.segments],
        }
        if self.language:
            result["language"] = self.language
        if self.language_probs:
            result["language_probs"] = self.language_probs
        if self.duration:
            result["duration"] = self.duration
        return result

    def export_json(self, output_path: str) -> None:
        """Export result as JSON file"""
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)

    def export_srt(self, output_path: str) -> None:
        """Export result as SRT subtitle file"""
        with open(output_path, "w", encoding="utf-8") as f:
            for i, segment in enumerate(self.segments, 1):
                start_time = self._format_timestamp(segment.start)
                end_time = self._format_timestamp(segment.end)
                f.write(f"{i}\n")
                f.write(f"{start_time} --> {end_time}\n")
                f.write(f"{segment.text.strip()}\n\n")

    def export_vtt(self, output_path: str) -> None:
        """Export result as WebVTT subtitle file"""
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("WEBVTT\n\n")
            for segment in self.segments:
                start_time = self._format_timestamp_vtt(segment.start)
                end_time = self._format_timestamp_vtt(segment.end)
                f.write(f"{start_time} --> {end_time}\n")
                f.write(f"{segment.text.strip()}\n\n")

    def export_txt(self, output_path: str) -> None:
        """Export result as plain text file"""
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(self.text)

    @staticmethod
    def _format_timestamp(seconds: float) -> str:
        """Format timestamp for SRT format (HH:MM:SS,mmm)"""
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        secs = int(seconds % 60)
        millis = int((seconds % 1) * 1000)
        return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

    @staticmethod
    def _format_timestamp_vtt(seconds: float) -> str:
        """Format timestamp for VTT format (HH:MM:SS.mmm)"""
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        secs = int(seconds % 60)
        millis = int((seconds % 1) * 1000)
        return f"{hours:02d}:{minutes:02d}:{secs:02d}.{millis:03d}"

