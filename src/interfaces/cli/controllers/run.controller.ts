import { RunDto } from '../dto/run.dto';
import { ExtractAudioTask } from '../../../infrastructure/tasks/extract-audio.task.impl';
import { ExecuteTranscriptionTask } from '../../../infrastructure/tasks/execute-transcription.task.impl';
import { ExecuteWorkflow } from '../../../application/use-cases/execute-workflow.case';
import { AudioExtractorService } from '../../../infrastructure/services/audio-extractor.service.impl';
import { TranscriptorService } from '../../../infrastructure/services/transcriptor.service.impl';
import { ExecuteTranscriptionCase } from '../../../application/use-cases/execute-transcription.case';
import { FileSystemService } from '../../../infrastructure/services/filesystem.service.impl';
import { ExtractAudioCase } from '../../../application/use-cases/extract-audio.case';

export const validateParams = (next: any) => {
  return async (inputFile: string, outputDir?: string) => {
    const runDto = new RunDto(inputFile);

    await runDto.validate().catch((error) => {
      throw new Error(`Validation failed: ${error.message}`);
    });

    return await next(inputFile, outputDir);
  };
};

export const ensureOutputDir = (next: any) => {
  return async (inputFile: string, outputDir: string) => {
    const fsSystemService = new FileSystemService();

    return await next(inputFile, await fsSystemService.ensureOutputDir(outputDir ?? inputFile));
  };
};

export const runHandler = async (videoPath: string, outputDir: string) => {
  const extractAudioTask = new ExtractAudioTask();
  const executeTranscriptionTask = new ExecuteTranscriptionTask();

  const executeWorkflow = new ExecuteWorkflow([extractAudioTask, executeTranscriptionTask]);

  executeWorkflow.addParams({
    data: { videoPath, outputDir },
    status: 'pending',
  });

  await executeWorkflow.run();
};

export const audioHandler = async (videoPath: string, outputDir: string) => {
  const audioService = new AudioExtractorService();
  const audioCase = new ExtractAudioCase(audioService);

  await audioCase.run(videoPath, outputDir);
};

export const transcriptHandler = async (audioPath: string, outputDir: string) => {
  const transcriptorService = new TranscriptorService();
  const transcriptionCase = new ExecuteTranscriptionCase(transcriptorService);

  await transcriptionCase.run(audioPath, outputDir);
};
