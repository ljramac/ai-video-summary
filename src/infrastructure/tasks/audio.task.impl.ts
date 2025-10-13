import { ExtractAudioCase } from '../../application/use-cases/tasks/audio.case';
import { TranscoderService } from '../services/transcoder.service.impl';
import { ITask } from '../../application/workflow/task.interface';
import { VideoFile } from '../../domain/entities/video.file';

export class ExtractAudioTask implements ITask {
  public readonly name: string = 'ExtractAudioTask';

  async run(data: { videoPath: string; outputDir: string }): Promise<any> {
    try {
      const extractAudioService = new TranscoderService();
      const extractAudioCase = new ExtractAudioCase(extractAudioService);

      const videoFile = new VideoFile(data.videoPath);

      const result: any = await extractAudioCase.run(videoFile, data.outputDir);

      return {
        status: 'completed',
        ...result,
      };
    } catch (error) {
      return { status: 'failed', error };
    }
  }
}
