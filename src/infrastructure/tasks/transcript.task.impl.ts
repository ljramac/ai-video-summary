import { AudioFile } from '../../domain/entities/audio.file';
import { Transcribe } from '../../application/use-cases/tasks/transcribe.case';
import { ITask } from '../../application/workflow/task.interface';
import { TranscriptorServiceFacade } from '../facades/transcription.service.facade.impl';

export class TranscriptionTask implements ITask {
  public readonly name: string = 'TranscriptionTask';

  async run(data: { audioFile: AudioFile }): Promise<any> {
    try {
      const transcriptorServiceFacade = new TranscriptorServiceFacade();
      const transcribe = new Transcribe(transcriptorServiceFacade);

      const result = await transcribe.run(data.audioFile);

      return { status: 'completed', ...result };
    } catch (error) {
      return { status: 'failed', error };
    }
  }
}
