import { SummaryFile } from '../../domain/entities/summary.file';
import { TranscriptionFile } from '../../domain/entities/transcription.file';

export interface ISummaryServiceFacade {
  run(transcriptionFile: TranscriptionFile, summaryFile: SummaryFile): Promise<any>;
}
