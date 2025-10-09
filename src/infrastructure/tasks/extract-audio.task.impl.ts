import { ExtractAudioCase } from '../../application/use-cases/extract-audio.case';
import { AudioExtractorService } from '../services/audio-extractor.service.impl';
import { ITask } from '../../application/task';

export class ExtractAudioTask implements ITask {
  public readonly name: string = 'ExtractAudioTask';

  async execute(data?: any): Promise<any> {
    try {
      console.log('Executing ExtractAudioTask with data:', data);

      const extractAudioService = new AudioExtractorService();
      const extractAudioCase = new ExtractAudioCase(extractAudioService);

      await extractAudioCase.run(data.videoPath, data.outputDir);

      return {
        status: 'completed',
        data: { ...data, info: 'ExtractAudioTask executed successfully' },
      };
    } catch (error: any) {
      console.error(`Error executing ExtractAudioTask: ${error}`);

      return { status: 'failed', data: { ...data, error: error.message } };
    }
  }
}
