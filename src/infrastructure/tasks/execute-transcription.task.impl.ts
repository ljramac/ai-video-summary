import { AudioFile } from '../../domain/entities/audio.file';
import { ExecuteTranscriptionCase } from '../../application/use-cases/execute-transcription.case';
import { TranscriptorService } from '../services/transcriptor.service.impl';
import { ITask } from '../../application/task.interface';

export class ExecuteTranscriptionTask implements ITask {
  public readonly name: string = 'ExecuteTranscriptionTask';

  async execute(data: { audioFile: AudioFile; outputDir: string }): Promise<any> {
    try {
      console.log('Executing ExecuteTranscriptionTask with data:', data);

      if (!data?.audioFile || !data?.outputDir) {
        throw new Error('Invalid data: audioFile and outputDir are required');
      }

      const transcriptorService = new TranscriptorService();
      const executeTranscriptionCase = new ExecuteTranscriptionCase(transcriptorService);

      await executeTranscriptionCase.run(data.audioFile.path, data.outputDir);

      return { status: 'completed', data };
    } catch (error) {
      console.error(`Error executing ExecuteTranscriptionTask: ${error}`);

      return { status: 'failed', data };
    }
  }
}
