import { TranscriptionFile } from '../../domain/entities/transcription.file';
import { Summarize } from '../../application/use-cases/tasks/summarize.case';
import { ITask } from '../../application/workflow/task.interface';
import { SummaryServiceFacade } from '../facades/summary.service.facade.impl';

export class SummaryTask implements ITask {
  public readonly name: string = 'SummaryTask';

  async run(data: { transcriptionFile: TranscriptionFile }): Promise<any> {
    try {
      const summaryServiceFacade = new SummaryServiceFacade();
      const summarize = new Summarize(summaryServiceFacade);

      const result = await summarize.run(data.transcriptionFile);

      return { status: 'completed', ...result };
    } catch (error) {
      return { status: 'failed', error };
    }
  }
}
