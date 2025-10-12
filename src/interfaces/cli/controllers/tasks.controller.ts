import { TranscoderService } from '../../../infrastructure/services/transcoder.service.impl';
import { Transcribe } from '../../../application/use-cases/tasks/transcribe.case';
import { ExtractAudioCase } from '../../../application/use-cases/tasks/audio.case';
import { TranscriptorServiceFacade } from '../../../infrastructure/facades/transcription.service.facade.impl';

export const audioHandler = async (videoPath: string, outputDir: string) => {
  const audioService = new TranscoderService();
  const audioCase = new ExtractAudioCase(audioService);

  await audioCase.run(videoPath, outputDir);
};

export const transcriptionHandler = async (audioPath: string) => {
  const transcriptorServiceFacade = new TranscriptorServiceFacade();
  const transcribe = new Transcribe(transcriptorServiceFacade);

  await transcribe.run(audioPath);
};
