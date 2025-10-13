# AI Video Summary

A comprehensive CLI application for video processing, audio extraction, transcription, and AI-powered summarization. This project implements a complete pipeline from video files to text summaries using OpenAI's services, built with TypeScript and clean architecture principles.

## Table of contents

- Overview
- Features
- Installation
- CLI Usage
- Configuration
- Project Structure & Architecture
- Development
- Testing
- Contributing
- License

## Overview

This repository contains a powerful CLI tool that processes video files through a complete workflow: audio extraction, speech-to-text transcription, and AI-powered summarization. The application is designed with clean architecture principles, featuring domain entities, application use-cases, infrastructure implementations, and a CLI interface.

The project can be used both as a CLI tool and as a Node.js library, built with CommonJS support.

> **Note**: Currently, this project only supports CommonJS. ESM support is planned for future releases to provide better module compatibility across different environments.

## Features

- **Complete Video Processing Pipeline**: Extract audio → Transcribe speech → Generate AI summary
- **Flexible CLI Commands**: Run individual steps or complete workflow
- **OpenAI Integration**: Uses OpenAI's Whisper for transcription and GPT for summarization
- **Multiple Formats Support**: mp4, mkv, avi, mov, m4a, mp3, wav
- **Clean Architecture**: Separated concerns with clear interfaces and implementations
- **TypeScript Support**: Full TypeScript implementation with strong typing
- **CommonJS Architecture**: Built with CommonJS modules for maximum compatibility
- **Configurable Logging**: Colored console output with structured logging
- **Command Aliases**: Multiple ways to invoke the same functionality

## Installation

### Global Installation (Recommended)

```bash
npm install -g @ljrama/ai-video-summary
```

After installation, use the global command:

```bash
ai-summary run path/to/video.mp4 [output/directory]
```

### Local Development

Requirements:

- Node.js 24.9.0+ (see `package.json` engines)
- npm or compatible package manager
- ffmpeg installed and available on PATH
- OpenAI API key

Clone and install:

```bash
git clone https://github.com/ljramac/ai-video-summary.git
cd ai-video-summary
npm install
```

Build the project:

```bash
npm run build
```

Run commands:

```bash
# Complete workflow (extract audio → transcribe → summarize)
npm start run path/to/video.mp4 [output/directory]

# Individual steps
npm start audio path/to/video.mp4 [output/directory]
npm start transcript path/to/audio.wav [output/directory]
npm start summary path/to/transcript.txt [output/directory]
```

### Development Mode

For development with hot reload:

```bash
npm run dev
```

**Notes:**

- If `output/directory` is omitted, the CLI creates an output directory next to the input file
- The CLI validates file extensions: mp4, mkv, avi, mov, m4a, mp3, wav
- OpenAI API key is required and loaded from environment variables
- The project uses the `config` package for configuration management
- The project is configured for CommonJS modules

## CLI Usage

### Commands Overview

The CLI provides four main commands with multiple aliases for convenience:

Available commands: `run`, `workflow`, `audio`, `extract`, `transcript`, `transcribe`, `summary`, `summarize`

#### 1. Complete Workflow

```bash
# Full pipeline: extract audio → transcribe → summarize
ai-summary run <videoPath> [outputDir]
ai-summary workflow <videoPath> [outputDir]     # alias
```

#### 2. Audio Extraction Only

```bash
# Extract audio from video file
ai-summary audio <videoPath> [outputDir]
ai-summary extract <videoPath> [outputDir]     # alias
```

#### 3. Transcription Only

```bash
# Transcribe existing audio file
ai-summary transcript <audioPath> [outputDir]
ai-summary transcribe <audioPath> [outputDir]  # alias
```

#### 4. Summarization Only

```bash
# Generate summary from existing transcript
ai-summary summary <transcriptPath> [outputDir]
ai-summary summarize <transcriptPath> [outputDir]  # alias
```

### Usage Examples

```bash
# Process a complete video (recommended)
ai-summary run ./videos/meeting.mp4 ./output
ai-summary workflow ./videos/meeting.mp4 ./output          # same as run

# Extract audio only
ai-summary audio ./videos/presentation.mp4 ./audio-output
ai-summary extract ./videos/presentation.mp4 ./audio-output   # same as audio

# Transcribe an existing audio file
ai-summary transcript ./audio/speech.wav ./transcripts
ai-summary transcribe ./audio/speech.wav ./transcripts       # same as transcript

# Generate summary from existing transcript
ai-summary summary ./transcripts/meeting.txt ./summaries
ai-summary summarize ./transcripts/meeting.txt ./summaries   # same as summary
```

### Architecture Behind Commands

- **`run`**: Uses `RunWorkflow` orchestrating `ExtractAudioTask` → `TranscriptionTask` → `SummaryTask`
- **`audio`**: Uses `ExtractAudioCase` with `TranscoderService` for audio extraction via ffmpeg
- **`transcript`**: Uses `Transcribe` with `TranscriptorServiceFacade` integrating OpenAI Whisper
- **`summary`**: Uses `Summarize` with `SummaryServiceFacade` integrating OpenAI GPT
- **Validation**: `WorkflowDTO` validates file extensions and paths
- **Storage**: `FileSystemService` handles output directory creation and file management

## Configuration

### Environment Variables

**Required for Node.js Library:**

- OpenAI API key (passed as constructor parameter)

**Optional for CLI:**

- OpenAI API key (will be prompted and saved on first use)
- `NODE_ENV`: Determines which config file to load (`development`, `production`, etc.)

### Configuration Files

The project uses the `config` package with files in the `config/` directory:

```json
// config/default.json
{
  "services": {
    "openai": {
      "apiKey": ""
    }
  }
}
```

### Setup Examples

**Development:**

```bash
# CLI will prompt for API key on first use
ai-summary run video.mp4

# Or use environment variable
export OPENAI_API_KEY="sk-your-openai-api-key"
ai-summary run video.mp4

# Or create config/local.json (ignored by git)
echo '{
  "services": {
    "openai": {
      "apiKey": "sk-your-openai-api-key"
    }
  }
}' > config/local.json
```

**Production:**

```bash
# CLI will use saved API key or prompt if not set
NODE_ENV=production ai-summary run video.mp4

# Or use environment variable
NODE_ENV=production OPENAI_API_KEY="sk-your-key" ai-summary run video.mp4
```

The CLI application will prompt for your OpenAI API key on first use and save it securely for future runs.

## Project Structure & Architecture

### Clean Architecture Layers

```
src/
├── index.ts                    # Library entry point (exports API)
├── application/                # Business logic & use cases
│   ├── services/
│   │   └── logger.service.ts   # Logging interface
│   ├── storage/
│   │   └── binary.storage.ts   # File system interface
│   ├── use-cases/
│   │   └── tasks/
│   │       ├── audio.case.ts       # Audio extraction use case
│   │       ├── transcribe.case.ts  # Transcription use case
│   │       └── summarize.case.ts   # Summarization use case
│   └── workflow/
│       ├── task.interface.ts       # Task contract
│       └── types/task.types.ts     # Workflow types
├── domain/                     # Entities & domain services
│   ├── entities/
│   │   ├── video.file.ts       # Video file entity
│   │   ├── audio.file.ts       # Audio file entity
│   │   └── transcription.file.ts # Transcription entity
│   └── services/               # Domain service interfaces
├── infrastructure/            # External integrations & implementations
│   ├── facades/               # Service facades
│   │   ├── transcription.service.facade.impl.ts
│   │   └── summary.service.facade.impl.ts
│   ├── services/              # Service implementations
│   │   ├── transcoder.service.impl.ts      # ffmpeg wrapper
│   │   └── logger.service.impl.ts          # Colored console logger
│   ├── storage/
│   │   └── binary.storage.impl.ts     # File system implementation
│   └── tasks/                 # Workflow task implementations
│       ├── audio.task.impl.ts              # Audio extraction task
│       ├── transcript.task.impl.ts         # Transcription task
│       └── summary.task.impl.ts            # Summarization task
└── interfaces/                # External interfaces
    └── cli/                   # Command-line interface
        ├── index.ts           # CLI entry point & command setup
        ├── controllers/
        │   ├── workflow.controller.ts     # Workflow command handler
        │   └── tasks.controller.ts       # Individual task handlers
        ├── middlewares/
        │   └── common.ts                 # Validation & utilities
        └── dto/
            ├── abstract.dto.ts           # Base DTO
            └── workflow.dto.ts           # Workflow validation

bin/
├── build.sh                   # Build script
└── cli.sh                     # CLI execution script

dist/
├── cjs/                       # CommonJS build
└── types/                     # TypeScript declarations
```

### Key Architecture Concepts

**Clean Architecture Principles:**

- **Domain Layer**: Core entities (VideoFile, AudioFile, TranscriptionFile) with no external dependencies
- **Application Layer**: Use cases orchestrating domain services and defining interfaces
- **Infrastructure Layer**: Concrete implementations of services (OpenAI integration, ffmpeg wrapper, file system)
- **Interface Layer**: CLI commands and controllers acting as adapters

**Workflow System:**

- Tasks implement `ITask` interface with standardized `run()` method
- `RunWorkflow` orchestrates multiple tasks with shared state (`TaskParams`)
- Task status tracking: `PENDING` → `RUNNING` → `COMPLETED` or `FAILED`
- Enhanced workflow state management with individual task tracking
- Improved error handling and result aggregation

**Service Pattern:**

- Domain services define interfaces (e.g., `IAudioService`, `ITranscriptorService`)
- Infrastructure provides implementations with external integrations
- Facades wrap complex service interactions

## Development

### Available Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run build`    | Build CommonJS version         |
| `npm start`        | Run CLI (requires build first) |
| `npm run dev`      | Development mode with ts-node  |
| `npm test`         | Run Jest tests                 |
| `npm run lint`     | ESLint on `src/`               |
| `npm run lint:fix` | Auto-fix lint issues           |
| `npm run prettier` | Format code with Prettier      |

### Development Workflow

1. **Setup Environment:**

   ```bash
   git clone https://github.com/ljramac/ai-video-summary.git
   cd ai-video-summary
   npm install
   ```

2. **Install System Dependencies:**

   ```bash
   # macOS
   brew install ffmpeg

   # Ubuntu/Debian
   sudo apt update && sudo apt install ffmpeg

   # Windows (with chocolatey)
   choco install ffmpeg
   ```

3. **Development Commands:**

   ```bash
   # Run in development mode (no build required)
   npm run dev

   # Build and test
   npm run build
   npm start workflow sample.mp4

   # Run tests
   npm test
   ```

### Code Quality

The project uses automated code quality tools:

- **ESLint**: TypeScript linting with recommended rules
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for pre-commit quality checks
- **lint-staged**: Runs linters only on staged files

Pre-commit hooks automatically:

1. Lint and fix TypeScript files
2. Format code with Prettier
3. Run type checking

### Adding New Features

**Adding a New Task:**

1. Create task implementation in `src/infrastructure/tasks/`
2. Implement `ITask` interface with `name` and `run()` method
3. Add task to workflow in `workflowHandler`
4. Create corresponding use-case in `src/application/use-cases/tasks/`

**Adding a New Service:**

1. Define interface in `src/domain/services/`
2. Create implementation in `src/infrastructure/services/`
3. Add facade if external API integration needed

## Testing

Unit tests live under `test/unit`. Run tests with:

```bash
npm test
```

The project uses Jest and ts-jest.

## Contributing

Contributions are welcome:

1. Create a feature branch
2. Write tests and keep changes focused
3. Run lint and tests before opening a PR

## API Usage (Node.js Library)

The package can also be used programmatically as a Node.js library:

```javascript
// CommonJS
const VideoSummary = require('@ljrama/ai-video-summary');

// Initialize with your OpenAI API key
const videoSummary = new VideoSummary({
  apiKey: 'sk-your-openai-api-key',
});

// Process a video file
async function processVideo() {
  try {
    const result = await videoSummary.generate(
      'path/to/video.mp4',
      'output/directory', // optional
    );
    console.log('Processing complete:', result);
  } catch (error) {
    console.error('Processing failed:', error);
  }
}

processVideo();
```

The library exports:

- `VideoSummary` class: Main class for video processing
  - `constructor({ apiKey: string })`: Initialize with OpenAI API key
  - `generate(videoPath: string, outputDir?: string)`: Complete workflow function
  - `validateParams(videoPath: string)`: Validate input file
  - `ensureOutputDir(videoPath: string, outputDir: string)`: Ensure output directory exists
- TypeScript types available via `@ljrama/ai-video-summary/types`

> **Note**: ESM support (import statements) is planned for future releases. Currently, only CommonJS (require) is supported.

## Contributing

Contributions are welcome! Please follow these guidelines:

### Contributing Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Add/update tests for new functionality
5. Run quality checks: `npm run lint && npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards

- Follow existing TypeScript/ESLint configuration
- Write tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Keep PRs focused and small

### Development Environment

- Node.js 24.9.0+
- All dependencies should be declared in `package.json`
- Follow clean architecture patterns established in the codebase

## License

This project is licensed under the ISC License. See `package.json` for full details.

**Author:** Lino Rama (ljramac@gmail.com)  
**Repository:** [ljramac/ai-video-summary](https://github.com/ljramac/ai-video-summary)
