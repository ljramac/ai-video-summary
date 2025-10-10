import { AudioFile } from '../../domain/entities/audio.file';
import { Transcribe } from '../../application/use-cases/transcribe.case';
import { TranscriptorService } from '../services/transcriptor.service.impl';
import { ITask } from '../../application/workflow/task.interface';

export class TranscriptionTask implements ITask {
  public readonly name: string = 'TranscriptionTask';

  async run(data: { audioFile: AudioFile; outputDir: string }): Promise<any> {
    try {
      if (!data?.audioFile || !data?.outputDir) {
        throw new Error('Invalid data: audioFile and outputDir are required');
      }

      const transcriptorService = new TranscriptorService();
      const transcribe = new Transcribe(transcriptorService);

      await transcribe.run(data.audioFile.path, data.outputDir);

      return { status: 'completed', data };
    } catch (error) {
      return { status: 'failed', data, error };
    }
  }
}
