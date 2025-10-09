import { AudioFile } from '../../domain/entities/audio.file';
import { ITranscriptorService } from '../../domain/services/transcriptor.service';

export class TranscriptorService implements ITranscriptorService {
  run(audioFile: AudioFile, outputDir: string): Promise<any> {
    console.log('Transcribing audio file:', audioFile.path);
    console.log('Output directory:', outputDir);

    return Promise.resolve('holi' + audioFile.path + ' ' + outputDir);
  }
}
