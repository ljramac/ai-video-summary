import { ITask, IParams } from '../../application/task';

export class DummyTask implements ITask {
  public readonly name: string = 'DummyTask';

  async execute(data?: IParams): Promise<IParams> {
    try {
      console.log('Executing DummyTask with data:', data);

      return { status: 'completed', data: { ...data, info: 'DummyTask executed successfully' } };
    } catch (error) {
      console.error(`Error executing DummyTask: ${error}`);

      return { status: 'failed', data };
    }
  }
}
