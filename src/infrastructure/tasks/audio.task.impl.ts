import { ExtractAudioCase } from '../../application/use-cases/tasks/audio.case';
import { TranscoderService } from '../services/transcoder.service.impl';
import { ITask } from '../../application/workflow/task.interface';

export class ExtractAudioTask implements ITask {
  public readonly name: string = 'ExtractAudioTask';

  async run(data: { videoPath: string; outputDir: string }): Promise<any> {
    try {
      const extractAudioService = new TranscoderService();
      const extractAudioCase = new ExtractAudioCase(extractAudioService);

      const result: any = await extractAudioCase.run(data.videoPath, data.outputDir);

      return {
        status: 'completed',
        ...result,
      };
    } catch (error) {
      return { status: 'failed', error };
    }
  }
}
