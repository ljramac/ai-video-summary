import { RunDto } from '../dto/run.dto';
import { ExtractAudioTask } from '../../../infrastructure/tasks/extract-audio.task.impl';
import { ExecuteWorkflow } from '../../../application/use-cases/execute-workflow.case';
import { AudioExtractorService } from '../../../infrastructure/services/audio-extractor.service.impl';
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

export const runHandler = async (inputFile: string, outputDir: string) => {
  const extractAudioTask = new ExtractAudioTask();
  const executeWorkflow = new ExecuteWorkflow([extractAudioTask]);

  executeWorkflow.addParams({
    data: { inputFile, outputDir },
    status: 'pending',
  });

  await executeWorkflow.run();
};

export const audioHandler = async (inputFile: string, outputDir: string) => {
  const audioService = new AudioExtractorService();
  const audioCase = new ExtractAudioCase(audioService);

  await audioCase.run(inputFile, outputDir);
};
