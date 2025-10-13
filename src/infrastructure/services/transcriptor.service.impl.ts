import fs from 'node:fs';
import config from 'config';
import OpenAI from 'openai';
import { AudioFile } from '../../domain/entities/audio.file';
import { ITranscriptorService } from '../../domain/services/transcript.service';
import { TranscoderService } from './transcoder.service.impl';

export class TranscriptorService implements ITranscriptorService {
  private readonly apiKey: string = config.get('services.openai.apiKey');

  async run(audioFile: AudioFile): Promise<any> {
    const openai = new OpenAI({ apiKey: this.apiKey });

    const audioExtractorService = new TranscoderService();
    const audioPaths = await audioExtractorService.cutBySize(audioFile.path);

    let fullTranscription = '';

    for (const path of audioPaths) {
      const partTranscription = await openai.audio.transcriptions
        .create({
          file: fs.createReadStream(path),
          model: 'whisper-1',
        })
        .catch((error) => error?.message);

      fullTranscription += partTranscription?.text ?? partTranscription + ' ';
    }

    return fullTranscription;
  }
}
