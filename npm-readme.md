# AI Video Summary

Transform your videos into AI-powered summaries with a simple CLI tool or Node.js library.

## What it does

This tool processes video files through a complete pipeline:

1. **Extract audio** from video files
2. **Transcribe speech** using OpenAI Whisper
3. **Generate AI summaries** using OpenAI GPT

## Quick Start

### Installation

```bash
npm install -g @ljrama/ai-video-summary
```

### Setup

The CLI will prompt for your OpenAI API key on first use and save it for future runs.

For Node.js library usage, you'll need to pass the API key as a constructor parameter.

### Usage

#### CLI Tool

```bash
# Complete workflow (extract → transcribe → summarize)
ai-summary run video.mp4

# Individual steps
ai-summary audio video.mp4        # Extract audio only
ai-summary transcript audio.wav   # Transcribe existing audio
ai-summary summary transcript.txt # Summarize existing transcript

# With custom output directory
ai-summary run video.mp4 ./output
```

#### Node.js Library

```javascript
const VideoSummary = require('@ljrama/ai-video-summary');

const processor = new VideoSummary({
  apiKey: 'sk-your-openai-api-key',
});

async function processVideo() {
  try {
    const result = await processor.generate('video.mp4', './output');
    console.log('Summary generated:', result);
  } catch (error) {
    console.error('Processing failed:', error);
  }
}

processVideo();
```

## Supported Formats

**Video:** mp4, mkv, avi, mov  
**Audio:** m4a, mp3, wav

## Requirements

- Node.js 24.9.0+
- ffmpeg (for audio extraction)
- OpenAI API key (prompted by CLI or passed to library)

## API Methods

### `new VideoSummary({ apiKey })`

Initialize with your OpenAI API key.

### `generate(videoPath, outputDir?)`

Process complete workflow: extract audio → transcribe → summarize.

**Returns:** Object with paths to generated files (audio, transcript, summary).

### `validateParams(videoPath)`

Validate input file format and existence.

### `ensureOutputDir(videoPath, outputDir)`

Create output directory structure.

## Output

The tool generates:

- `audio.wav` - Extracted audio file
- `transcript.txt` - Speech transcription
- `summary.txt` - AI-generated summary

## Configuration

You can also use configuration files:

```json
// config/local.json
{
  "services": {
    "openai": {
      "apiKey": "sk-your-openai-api-key"
    }
  }
}
```

## Troubleshooting

**"No API key configured"**  
→ The CLI will prompt you for your OpenAI API key on first use

**"ffmpeg not found"**  
→ Install ffmpeg: `brew install ffmpeg` (macOS) or `apt install ffmpeg` (Ubuntu)

**"Unsupported file format"**  
→ Use supported formats: mp4, mkv, avi, mov, m4a, mp3, wav

## License

ISC License - Lino Rama (ljramac@gmail.com)

## Links

- [GitHub Repository](https://github.com/ljramac/ai-video-summary)
- [Issues & Support](https://github.com/ljramac/ai-video-summary/issues)
