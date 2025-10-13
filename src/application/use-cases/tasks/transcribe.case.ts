import { AudioFile } from '../../../domain/entities/audio.file';
import { TranscriptionFile } from '../../../domain/entities/transcription.file';
import { ITranscriptorServiceFacade } from '../../facades/transcript.service.facade';

export class Transcribe {
  private readonly transcriptorServiceFacade: ITranscriptorServiceFacade;

  constructor(transcriptorServiceFacade: ITranscriptorServiceFacade) {
    this.transcriptorServiceFacade = transcriptorServiceFacade;
  }

  async run(audioFile: AudioFile, outputDir?: string): Promise<any> {
    const dirname = outputDir ?? audioFile.getDirname();
    const pathname = `${dirname}/${audioFile.getName()}`;

    const transcriptionFile = new TranscriptionFile(`${pathname}_transcription.txt`);

    const result = await this.transcriptorServiceFacade.run(audioFile, transcriptionFile);

    return { ...result, transcriptionFile };
  }
}
