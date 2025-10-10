import { ExtractAudioCase } from '../../application/use-cases/audio.case';
import { AudioExtractorService } from '../services/audio-extractor.service.impl';
import { ITask } from '../../application/workflow/task.interface';

export class ExtractAudioTask implements ITask {
  public readonly name: string = 'ExtractAudioTask';

  async run(data?: any): Promise<any> {
    try {
      const extractAudioService = new AudioExtractorService();
      const extractAudioCase = new ExtractAudioCase(extractAudioService);

      const result: any = await extractAudioCase.run(data.videoPath, data.outputDir);

      return {
        status: 'completed',
        data: { ...data, info: 'ExtractAudioTask executed successfully', ...result },
      };
    } catch (error) {
      return { status: 'failed', data: { ...data, error } };
    }
  }
}
