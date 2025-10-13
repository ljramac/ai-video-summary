import openai from 'openai';
import config from 'config';
import { TranscriptionFile } from '../../domain/entities/transcription.file';
import { ISummaryService } from '../../domain/services/summary.service';

export class SummaryService implements ISummaryService {
  private readonly apiKey: string = config.get('services.openai.apiKey');
  private readonly openaiClient: any;

  constructor() {
    this.openaiClient = new openai.OpenAI({ apiKey: this.apiKey });
  }

  async detectLanguage(text: string): Promise<string> {
    const result = await this.openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `Detect the language of the following text and respond with only the language name (e.g., English, Spanish, French):\n\n${text}`,
        },
      ],
    });

    return result.choices[0].message?.content?.trim() ?? '';
  }

  async run(transcriptionFile: TranscriptionFile): Promise<any> {
    let fullSummaryText = '';
    const chunkSize = 3000;

    const language = await this.detectLanguage(transcriptionFile.text.substr(0, 100));

    for (let i = 0; i < transcriptionFile.text.length; i += chunkSize) {
      try {
        const chunk = transcriptionFile.text.slice(i, i + chunkSize);

        const context = `This is part ${i / chunkSize + 1} of a full transcription text.`;
        const prompt = `
          Please, make a summary in markdown format of this transcription in its original language ${language}:
          ${chunk}
          `;

        const content = `${i <= transcriptionFile.text.length + 1 ? prompt : `${context}\n\n${prompt}`}`;

        const result = await this.openaiClient.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content,
            },
          ],
        });

        fullSummaryText += (result.choices[0].message?.content ?? '') + '\n\n';
      } catch (error: any) {
        fullSummaryText += `\n\n[Error generating summary for part ${i / chunkSize + 1}: ${error?.message ?? error}]\n\n`;
      }
    }

    return fullSummaryText;
  }
}
