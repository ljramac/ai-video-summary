AI Video Summary

A lightweight CLI application to extract audio from video files, transcribe audio, and run a multi-step workflow. This project is implemented in TypeScript and organized with a clean architecture: domain (entities and interfaces), application (use-cases, workflow), infrastructure (implementations), and interfaces (CLI).

## Table of contents

- Overview
- Features
- Quickstart
- CLI Usage
- Configuration
- Project Structure & Architecture
- Development
- Testing
- Contributing
- License

## Overview

This repository contains a CLI tool that can extract audio from video files, run transcription on audio files, and execute a configurable workflow composed of tasks. The codebase is organized for extensibility and testability.

The main entrypoint is the CLI under `src/interfaces/cli` which wires together tasks and services from the `application` and `infrastructure` layers.

## Features

- Extract audio from common video formats (mp4, mkv, avi, mov, etc.)
- Transcribe audio files via a transcriptor service
- Pluggable, ordered task workflow (audio extraction + transcription)
- Simple CLI with `workflow`, `audio`, and `transcript` commands
- Config-driven secrets and settings using `config` package

## Quickstart

Requirements:

- Node.js (see `package.json` engines; project targets Node 24.x)
- npm (or a compatible package manager)
- ffmpeg (or the tool used by the audio extractor implementation) installed and available on PATH

Install dependencies:

```bash
npm install
```

Build (optional):

```bash
npm run build
```

Run the CLI directly (via ts-node):

```bash
# Run full workflow (extract audio then transcribe)
npm start -- workflow path/to/video.mp4 output/directory

# Extract audio only
npm start -- audio path/to/video.mp4 output/directory

# Transcribe an existing audio file
npm start -- transcript path/to/audio.m4a output/directory
```

Notes:

- If `output/directory` is omitted, the CLI will create an output directory next to the input file.
- The CLI validates file extensions. Supported inputs for validation include: mp4, mkv, avi, mov, m4a, mp3, wav.
- The project uses the `config` package. Put environment-specific settings in `config/*.yml`.

## CLI Usage

Commands exposed by the CLI:

- workflow <videoPath> [outputDir]
  - Executes the workflow: runs `ExtractAudioTask` followed by `TranscriptionTask`.

- audio <videoPath> [outputDir]
  - Runs only the audio extraction use-case.

- transcript <audioPath> [outputDir]
  - Runs only the transcription use-case on an existing audio file.

Behind the scenes:

- `workflow` uses `RunWorkflow` from `application/use-cases/workflow.case.ts` with tasks from `infrastructure/workflow/`.
- `audio` uses `ExtractAudioCase` from `application/use-cases/audio.case.ts` and `TranscoderService` from `infrastructure/services/audio-extractor.service.impl.ts`.
- `transcript` uses `Transcribe` from `application/use-cases/transcribe.case.ts` and `TranscriptorService` from `infrastructure/services/transcriptor.service.impl.ts`.
- CLI middlewares in `src/interfaces/cli/middlewares/common.ts` provide validation via `WorkflowDTO` and output directory handling via `FileSystemService` from `infrastructure/storage/fs.storage.impl.ts`.

## Configuration

This project uses the `config` package. Default configuration files are located in the `config/` directory. Typical settings you might provide:

- services.whisper.token — API token for a transcription service (referenced from code)
- other service endpoints and credentials depending on integrations

`NODE_ENV` determines which config file is loaded. You can add `config/local.yml` for local overrides (ensure you don’t commit secrets).

## Project Structure & Architecture

High-level layout:

- src/
  - index.ts — CLI entrypoint loader
  - application/
    - use-cases/
      - `workflow.case.ts` — orchestration runner (`RunWorkflow`)
      - `audio.case.ts` — audio extraction use-case (`ExtractAudioCase`)
      - `transcribe.case.ts` — transcription use-case (`Transcribe`)
    - storage/
      - `fs.storage.ts` — filesystem service interface (`IBinaryService`)
    - workflow/
      - `task.interface.ts`, `types/task.types.ts` — workflow contracts and types
  - domain/
    - entities/
      - `video.file.ts`, `audio.file.ts`
    - services/
      - `audio.service.ts`, `transcript.service.ts` — service interfaces
  - infrastructure/
    - services/
      - `audio-extractor.service.impl.ts`, `transcriptor.service.impl.ts`
    - storage/
      - `fs.storage.impl.ts` — `FileSystemService` (includes `ensureOutputDir`)
    - workflow/
      - `audio.task.impl.ts`, `transcript.task.impl.ts`, `dummy.task.impl.ts`
  - interfaces/
    - cli/
      - index.ts — command registration
      - controllers/run.controller.ts — command handlers (`workflowHandler`, `audioHandler`, `transcriptionHandler`)
      - middlewares/common.ts — validation and output dir helpers
      - dto/ — `abstract.dto.ts`, `workflow.dto.ts`

Key concepts:

- Workflow and tasks: tasks implement a common contract and are executed by `RunWorkflow` with shared `TaskParams` and `TaskStatus`.
- Use-cases orchestrate domain services: `ExtractAudioCase` uses `ITranscoderService`; `Transcribe` uses `ITranscriptorService`.
- Infrastructure provides concrete implementations for services and tasks.
- The filesystem abstraction lives under `application/storage` (interface) and `infrastructure/storage` (implementation).

## Development

Scripts:

- `npm start` — runs `src/index.ts` with ts-node
- `npm run build` — compile TypeScript
- `npm run lint` — ESLint on `src`
- `npm run lint:fix` — fix lint issues
- `npm run prettier` — format with Prettier
- `npm test` — run Jest tests

Husky and lint-staged enforce linting/formatting pre-commit.

Local development tips:

1. Ensure ffmpeg is installed and on PATH.
2. Set up config files under `config/` or environment variables for tokens like `services.whisper.token`.
3. Try the commands in small steps: `audio` first, then `transcript`, then `workflow`.

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

## License

This project is licensed under the ISC License. See `package.json` for details.
