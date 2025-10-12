import { TranscriptionFile } from '../entities/transcription.file';

export interface ISummaryService {
  run(transcriptionFile: TranscriptionFile): Promise<any>;
}
