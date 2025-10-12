import { AudioFile } from '../../domain/entities/audio.file';
import { TranscriptionFile } from '../../domain/entities/transcription.file';

export interface ITranscriptorServiceFacade {
  run(audioFile: AudioFile, transcriptionFile: TranscriptionFile): Promise<any>;
}
