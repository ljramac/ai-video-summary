AI Video Summary

A lightweight CLI application to extract audio from video files and run transcription/workflows. This project is implemented in TypeScript and designed as a small, modular pipeline with clear separation between domain, application, and infrastructure layers.

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

This repository contains a CLI tool that can extract audio from video files and run a configurable workflow of tasks (for example: extract audio, transcribe speech, summarize text). The codebase is organized with a clean architecture approach: domain entities and services, application use-cases, and infrastructure implementations.

The main entrypoint is the CLI under `src/interfaces/cli` which wires together tasks and services from the `application` and `infrastructure` layers.

## Features

- Extract audio from common video formats (mp4, mkv, avi, mov, etc.)
- Pluggable task-based workflow execution
- Simple CLI interface with `run` and `audio` commands
- Config-driven secrets and service settings using `config` package

## Quickstart

Requirements:

- Node.js (recommended: version listed in `package.json` engines; this project targets Node 24.x)
- npm (or compatible package manager)
- ffmpeg (or the underlying tool used by the audio extractor service, installed on your PATH)

Install dependencies:

```bash
npm install
```

Build (optional):

```bash
npm run build
```

Run the CLI directly (TypeScript runtime via ts-node is configured):

```bash
npm start -- run path/to/video.mp4 output/directory
```

Or run just the audio extraction:

```bash
npm start -- audio path/to/video.mp4 output/directory
```

Notes:

- If `output/directory` is omitted, the CLI will create an output directory next to the input file.
- The project uses the `config` package. Put environment-specific settings in `config/*.yml`.

## CLI Usage

The CLI exports two commands: `run` and `audio`.

- run <videoPath> [outputDir]
  - Runs the full workflow (currently configured to run extract-audio task).

- audio <videoPath> [outputDir]
  - Runs only the audio extraction use-case.

Examples:

```bash
# Run full workflow
npm start -- run ./videos/sample.mp4 ./out

# Extract audio only
npm start -- audio ./videos/sample.mp4
```

The CLI performs basic validation on the input file extension (mp4, mkv, avi, mov, m4a, mp3). If validation fails, it will throw an error and exit.

## Configuration

This project uses the `config` package. Default configuration files are located in the `config/` directory. Typical settings you might provide:

- services.whisper.token — API token for a transcription service (example key referenced in code)
- other service endpoints and credentials depending on integrations

Environment variables and `NODE_ENV` determine which config file is loaded (see `config` package docs).

## Project Structure & Architecture

High-level layout:

- src/
  - index.ts — application entrypoint that starts the CLI
  - application/ — use-cases and task orchestration
  - domain/ — entities and domain services interfaces
  - infrastructure/ — concrete implementations (audio extractor, filesystem, tasks)
  - interfaces/cli — CLI layer (controllers, DTOs)

Key concepts:

- Tasks: units of work that can be composed into workflows. Example: `ExtractAudioTask`.
- Use-cases: application-level operations that orchestrate services (e.g., `ExtractAudioCase`, `ExecuteWorkflow`).
- Services: abstractions in `domain/services` with concrete implementations under `infrastructure/services`.

This separation allows swapping implementations (for example, replacing the audio extraction implementation or adding a remote transcription service) without changing business logic.

## Development

Basic scripts from `package.json`:

- npm start — runs `src/index.ts` with `ts-node` (uses CommonJS module option)
- npm run build — compiles TypeScript to JavaScript using `tsc`
- npm run lint — runs ESLint on `src`
- npm run lint:fix — fixes lint issues where possible
- npm run prettier — formats code with Prettier
- npm test — runs Jest tests under `test`

Husky and lint-staged are configured to run lint and prettier on staged files before commits.

Local development recommendations:

1. Install Node and required system-level tools (ffmpeg).
2. Create a personal `config/local.yml` or set environment variables for any secrets (for example, `services.whisper.token`).
3. Run the CLI with `npm start -- run <video> [out]` while iterating on code.

## Testing

Unit tests are located under `test/unit`. Run tests with:

```bash
npm test
```

The project uses Jest with `ts-jest`.

## Contribution

Contributions are welcome. Suggested workflow:

1. Fork the repository and create a feature branch.
2. Run lint and tests locally before opening a PR.
3. Keep changes small and focused; include tests for new behaviors.

Please follow the repository linting and formatting rules. Husky hooks run pre-commit to help.

## Notes & Next steps

- The repo is organized to allow adding transcription, summarization, and other AI-based processors as separate tasks.
- If you plan to integrate remote APIs (OpenAI/Whisper or others), add a secure place to store tokens (environment variables or a secret manager) and reference them from `config`.

If you want, I can also:

- Add an example `config/local.yml` with placeholder keys
- Add a sample script that processes a small test video and demonstrates the full pipeline
- Add more docs describing how to implement a new task and register it with the workflow

## License

This project is licensed under the ISC License. See `package.json` for author and license details.
