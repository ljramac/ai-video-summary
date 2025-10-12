import axios from 'axios';
import config from 'config';
import { TranscriptionFile } from '../../domain/entities/transcription.file';
import { ISummaryService } from '../../domain/services/summary.service';

export class SummaryService implements ISummaryService {
  private readonly apiKey: string = config.get('services.claude.apiKey');

  run(transcriptionFile: TranscriptionFile): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
      'anthropic-version': '2023-06-01',
    };

    const data = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200000,
      messages: [
        {
          role: 'user',
          content: `${config.get('services.claude.summary.prompt.prefix')}: ${transcriptionFile.text}`,
        },
      ],
    };

    return axios.post(config.get('services.claude.url'), data, { headers });
  }
}
