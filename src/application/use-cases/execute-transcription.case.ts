import { AudioFile } from '../../domain/entities/audio.file';
import { ITranscriptorService } from '../../domain/services/transcriptor.service';

export class ExecuteTranscriptionCase {
  private readonly transcriptorService: ITranscriptorService;

  constructor(transcriptorService: ITranscriptorService) {
    this.transcriptorService = transcriptorService;
  }

  async run(audioPath: string, outputDir: string) {
    const audioFile = new AudioFile(audioPath);

    await this.transcriptorService.run(audioFile, outputDir);
  }
}
