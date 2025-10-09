import { ITask } from '../../application/task.interface';

export class DummyTask implements ITask {
  public readonly name: string = 'DummyTask';

  async execute(data?: any): Promise<any> {
    try {
      console.log('Executing DummyTask with data:', data);

      return { status: 'completed', data: { ...data, info: 'DummyTask executed successfully' } };
    } catch (error) {
      console.error(`Error executing DummyTask: ${error}`);

      return { status: 'failed', data };
    }
  }
}
