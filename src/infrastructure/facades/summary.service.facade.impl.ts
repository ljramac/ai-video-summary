import { SummaryFile } from '../../domain/entities/summary.file';
import * as FileCases from '../../application/use-cases/storage/create-file.case';
import { TranscriptionFile } from '../../domain/entities/transcription.file';
import { ISummaryServiceFacade } from '../../application/facades/summary.service.facade';
import { SummaryService } from '../services/summary.service.impl';
import { FileSystemService } from '../storage/binary.storage.impl';

export class SummaryServiceFacade implements ISummaryServiceFacade {
  private readonly summaryService: SummaryService;

  constructor() {
    this.summaryService = new SummaryService();
  }

  async run(transcriptionFile: TranscriptionFile, summaryFile: SummaryFile): Promise<any> {
    const result: string = await this.summaryService.run(transcriptionFile);

    const storageService = new FileSystemService();

    await FileCases.createFile(storageService)(summaryFile.path, result);

    summaryFile.addText(result);

    return { summaryText: result };
  }
}
