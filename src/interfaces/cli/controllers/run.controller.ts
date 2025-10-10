import { ExtractAudioTask } from '../../../infrastructure/workflow/audio.task.impl';
import { TranscriptionTask } from '../../../infrastructure/workflow/transcript.task.impl';
import { RunWorkflow } from '../../../application/use-cases/workflow.case';
import { AudioExtractorService } from '../../../infrastructure/services/audio-extractor.service.impl';
import { TranscriptorService } from '../../../infrastructure/services/transcriptor.service.impl';
import { Transcribe } from '../../../application/use-cases/transcribe.case';
import { ExtractAudioCase } from '../../../application/use-cases/audio.case';
import { TaskStatus, TaskParams } from '../../../application/workflow/types/task.types';

export const workflowHandler = async (videoPath: string, outputDir: string) => {
  const extractAudioTask = new ExtractAudioTask();
  const transcriptionTask = new TranscriptionTask();

  const runWorkflow = new RunWorkflow([extractAudioTask, transcriptionTask]);

  const params: TaskParams = { data: { videoPath, outputDir }, status: TaskStatus.PENDING };

  runWorkflow.addParams(params);

  await runWorkflow.run();
};

export const audioHandler = async (videoPath: string, outputDir: string) => {
  const audioService = new AudioExtractorService();
  const audioCase = new ExtractAudioCase(audioService);

  await audioCase.run(videoPath, outputDir);
};

export const transcriptionHandler = async (audioPath: string, outputDir: string) => {
  const transcriptorService = new TranscriptorService();
  const transcribe = new Transcribe(transcriptorService);

  await transcribe.run(audioPath, outputDir);
};
