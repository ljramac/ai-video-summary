import { TranscriptionFile } from '../../../domain/entities/transcription.file';
import { SummaryFile } from '../../../domain/entities/summary.file';
import { ISummaryServiceFacade } from '../../../application/facades/summary.service.facade';

export class Summarize {
  private readonly summaryServiceFacade: ISummaryServiceFacade;

  constructor(summaryServiceFacade: ISummaryServiceFacade) {
    this.summaryServiceFacade = summaryServiceFacade;
  }

  async run(transcriptionFile: TranscriptionFile, outputDir?: string): Promise<any> {
    const dirname = outputDir ?? transcriptionFile.getDirname();
    const pathname = `${dirname}/${transcriptionFile.getName()}`;

    const summaryFile = new SummaryFile(`${pathname}_summary.md`);

    const result = await this.summaryServiceFacade.run(transcriptionFile, summaryFile);

    return result;
  }
}
