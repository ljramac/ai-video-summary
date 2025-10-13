import config from 'config';
import { TaskParams, TaskStatus } from './application/workflow/types/task.types';
import { ExtractAudioTask } from './infrastructure/tasks/audio.task.impl';
import { TranscriptionTask } from './infrastructure/tasks/transcript.task.impl';
import { SummaryTask } from './infrastructure/tasks/summary.task.impl';
import { RunWorkflow } from './application/use-cases/workflow.case';
import { WorkflowDTO } from './interfaces/cli/dto/workflow.dto';
import { FileSystemService } from './infrastructure/storage/binary.storage.impl';

class VideoSummary {
  private readonly apiKey: string;

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;

    config.util.extendDeep(config, {
      services: {
        openai: {
          apiKey: this.apiKey,
        },
      },
    });
  }

  async validateParams(videoPath: string) {
    const workflowDto = new WorkflowDTO(videoPath);

    return await workflowDto.validate().catch((error: any) => {
      throw new Error(`Validation failed: ${error.message}`);
    });
  }

  async ensureOutputDir(videoPath: string, outputDir: string) {
    const fsSystemService = new FileSystemService();

    return await fsSystemService.ensureOutputDir(outputDir ?? videoPath);
  }

  async generate(videoPath: string, outputDir?: string) {
    await this.validateParams(videoPath);

    outputDir = await this.ensureOutputDir(videoPath, outputDir ?? '');

    const extractAudioTask = new ExtractAudioTask();
    const transcriptionTask = new TranscriptionTask();
    const summaryTask = new SummaryTask();

    const runWorkflow = new RunWorkflow([extractAudioTask, transcriptionTask, summaryTask]);

    const params: TaskParams = { videoPath, outputDir, status: TaskStatus.PENDING };

    runWorkflow.addParams(params);

    return await runWorkflow.run();
  }
}

export default VideoSummary;
