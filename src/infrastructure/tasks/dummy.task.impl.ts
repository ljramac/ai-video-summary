import { ITask } from '../../application/workflow/task.interface';

export class DummyTask implements ITask {
  public readonly name: string = 'DummyTask';

  async run(data?: any): Promise<any> {
    try {
      return {
        status: 'completed',
        info: 'DummyTask executed successfully with data: ' + JSON.stringify(data),
      };
    } catch (error) {
      return { status: 'failed', error };
    }
  }
}
