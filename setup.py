"""Setup script for whisper-plus"""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="whisper-plus",
    version="0.1.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="Enhanced Python wrapper for whisper.cpp with REST API, async processing, and batch operations",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/YOUR_USERNAME/whisper-plus",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Multimedia :: Sound/Audio :: Speech",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.9",
    install_requires=[
        "numpy>=1.21.0",
        "ffmpeg-python>=0.2.0",
    ],
    extras_require={
        "api": [
            "fastapi>=0.104.0",
            "uvicorn[standard]>=0.24.0",
            "python-multipart>=0.0.6",
            "websockets>=12.0",
        ],
        "cli": [
            "click>=8.1.0",
            "tqdm>=4.66.0",
            "yt-dlp>=2023.11.0",
        ],
        "all": [
            "whisper-plus[api,cli]",
        ],
    },
    entry_points={
        "console_scripts": [
            "whisper-plus=whisper_plus.cli.main:main",
            "whisper-plus-api=whisper_plus.api.server:main",
        ],
    },
)

