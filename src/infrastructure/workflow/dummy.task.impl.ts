import { ITask } from '../../application/workflow/task.interface';

export class DummyTask implements ITask {
  public readonly name: string = 'DummyTask';

  async run(data?: any): Promise<any> {
    try {
      return { status: 'completed', data: { ...data, info: 'DummyTask executed successfully' } };
    } catch (error) {
      return { status: 'failed', data, error };
    }
  }
}
