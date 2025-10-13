import fs from 'node:fs';
import { logger } from '../../../infrastructure/services/logger.service.impl';
import { VideoFile } from '../../../domain/entities/video.file';
import { AudioFile } from '../../../domain/entities/audio.file';
import { TranscoderService } from '../../../infrastructure/services/transcoder.service.impl';
import { Transcribe } from '../../../application/use-cases/tasks/transcribe.case';
import { ExtractAudioCase } from '../../../application/use-cases/tasks/audio.case';
import { TranscriptorServiceFacade } from '../../../infrastructure/facades/transcription.service.facade.impl';
import { TranscriptionFile } from '../../../domain/entities/transcription.file';
import { Summarize } from '../../../application/use-cases/tasks/summarize.case';
import { SummaryServiceFacade } from '../../../infrastructure/facades/summary.service.facade.impl';

export const audioHandler = async (videoPath: string, outputDir: string) => {
  const audioService = new TranscoderService();
  const audioCase = new ExtractAudioCase(audioService);

  const videoFile = new VideoFile(videoPath);

  const result = await audioCase.run(videoFile, outputDir);

  if (result.videoFile) {
    logger.info(`- Video File: ${result.videoFile.path}`);
  }

  if (result.audioFile) {
    logger.info(`- Audio File: ${result.audioFile.path}`);
  }
};

export const transcriptionHandler = async (audioPath: string, outputDir: string) => {
  const transcriptorServiceFacade = new TranscriptorServiceFacade();
  const transcribe = new Transcribe(transcriptorServiceFacade);

  const audioFile = new AudioFile(audioPath);

  const result = await transcribe.run(audioFile, outputDir);

  if (result.transcriptionFile) {
    logger.info(`- Transcription File: ${result.transcriptionFile.path}`);
  }
};

export const summaryHandler = async (transcriptionPath: string, outputDir: string) => {
  const summaryServiceFacade = new SummaryServiceFacade();
  const summarize = new Summarize(summaryServiceFacade);

  const transcriptionFile = new TranscriptionFile(transcriptionPath);
  const transcriptionText = fs.readFileSync(transcriptionFile.path, 'utf-8').toString();

  transcriptionFile.addText(transcriptionText);

  const result = await summarize.run(transcriptionFile, outputDir);

  if (result.summaryFile) {
    logger.info(`- Summary File: ${result.summaryFile.path}`);
  }
};
