import { WorkflowDTO } from '../dto/workflow.dto';
import { FileSystemService } from '../../../infrastructure/storage/fs.storage.impl';

export const validateParams = (next: any) => {
  return async (inputFile: string, outputDir?: string) => {
    const workflowDto = new WorkflowDTO(inputFile);

    await workflowDto.validate().catch((error) => {
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
