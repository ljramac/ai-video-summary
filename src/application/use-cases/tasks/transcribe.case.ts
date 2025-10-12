import { AudioFile } from '../../../domain/entities/audio.file';
import { TranscriptionFile } from '../../../domain/entities/transcription.file';
import { ITranscriptorServiceFacade } from '../../facades/transcript.service.facade';

export class Transcribe {
  private readonly transcriptorServiceFacade: ITranscriptorServiceFacade;

  constructor(transcriptorServiceFacade: ITranscriptorServiceFacade) {
    this.transcriptorServiceFacade = transcriptorServiceFacade;
  }

  async run(audioPath: string): Promise<any> {
    const audioFile = new AudioFile(audioPath);
    const transcriptionFile = new TranscriptionFile(
      `${audioFile.getPathWithoutExt(audioPath)}.txt`,
    );

    const result = await this.transcriptorServiceFacade.run(audioFile, transcriptionFile);

    return { ...result, transcriptionFile };
  }
}
