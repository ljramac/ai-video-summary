import { AudioFile } from '../../domain/entities/audio.file';
import * as FileCase from '../../application/use-cases/storage/create-file.case';
import { TranscriptionFile } from '../../domain/entities/transcription.file';
import { ITranscriptorServiceFacade } from '../../application/facades/transcript.service.facade';
import { TranscriptorService } from '../services/transcriptor.service.impl';
import { FileSystemService } from '../storage/binary.storage.impl';

export class TranscriptorServiceFacade implements ITranscriptorServiceFacade {
  private readonly transcriptorService: TranscriptorService;

  constructor() {
    this.transcriptorService = new TranscriptorService();
  }

  async run(audioFile: AudioFile, transcriptionFile: TranscriptionFile): Promise<any> {
    const result: string = await this.transcriptorService.run(audioFile);

    const storageService = new FileSystemService();

    await FileCase.createFile(storageService)(
      transcriptionFile.path,
      JSON.stringify(result, null, 2),
    );

    transcriptionFile.addText(result);

    return { transcriptionText: result };
  }
}
