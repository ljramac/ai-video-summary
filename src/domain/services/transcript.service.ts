import { AudioFile } from '../entities/audio.file';

export interface ITranscriptorService {
  run(audioFile: AudioFile, outputDir: string): Promise<any>;
}
