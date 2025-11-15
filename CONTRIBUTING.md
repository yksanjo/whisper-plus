# Contributing to whisper-plus

Thank you for your interest in contributing to whisper-plus! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/whisper-plus.git`
3. Create a virtual environment: `python -m venv venv`
4. Activate it: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
5. Install dependencies: `pip install -e ".[all,dev]"`

## Development Setup

```bash
# Install in development mode
pip install -e ".[all]"

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Format code
black whisper_plus tests

# Lint code
flake8 whisper_plus tests

# Type check
mypy whisper_plus
```

## Code Style

- Follow PEP 8
- Use `black` for formatting (line length: 100)
- Use type hints where possible
- Write docstrings for all public functions/classes
- Keep functions focused and small

## Testing

- Write tests for new features
- Ensure all tests pass: `pytest`
- Aim for >80% test coverage
- Use `pytest-asyncio` for async tests

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Write/update tests
4. Ensure tests pass
5. Format and lint your code
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## Pull Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Ensure CI passes
- Update documentation if needed
- Add examples if adding new features

## Areas for Contribution

- Core transcription functionality
- Async operations
- REST API improvements
- CLI tools
- Documentation
- Tests
- Examples
- Performance optimizations

Thank you for contributing! 🎉

