import { ITask, IParams } from '../task';

export class ExecuteWorkflow {
  private params: IParams = {};
  constructor(private tasks: ITask[]) {}

  async run(): Promise<any> {
    for (const task of this.tasks) {
      this.params = await task.execute(this.params?.data);

      console.log(`Task ${task.name} executed with result: ${this.params?.status}`);
    }
  }
}
