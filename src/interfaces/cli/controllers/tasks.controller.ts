import fs from 'node:fs';
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

  await audioCase.run(videoFile, outputDir);
};

export const transcriptionHandler = async (audioPath: string, outputDir: string) => {
  const transcriptorServiceFacade = new TranscriptorServiceFacade();
  const transcribe = new Transcribe(transcriptorServiceFacade);

  const audioFile = new AudioFile(audioPath);

  await transcribe.run(audioFile, outputDir);
};

export const summaryHandler = async (transcriptionPath: string, outputDir: string) => {
  const summaryServiceFacade = new SummaryServiceFacade();
  const summarize = new Summarize(summaryServiceFacade);

  const transcriptionFile = new TranscriptionFile(transcriptionPath);
  const transcriptionText = fs.readFileSync(transcriptionFile.path, 'utf-8').toString();

  transcriptionFile.addText(transcriptionText);

  await summarize.run(transcriptionFile, outputDir);
};
