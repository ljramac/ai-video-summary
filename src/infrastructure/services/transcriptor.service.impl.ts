import { AudioFile } from '../../domain/entities/audio.file';
import { ITranscriptorService } from '../../domain/services/transcript.service';

export class TranscriptorService implements ITranscriptorService {
  run(audioFile: AudioFile, outputDir: string): Promise<any> {
    return Promise.resolve('holi' + audioFile.path + ' ' + outputDir);
  }
}
