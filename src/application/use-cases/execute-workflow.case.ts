import { ITask } from '../task';

export class ExecuteWorkflow {
  private params: any = {};
  constructor(private tasks: ITask[]) {}

  addParams(params: any) {
    this.params = { ...this.params, ...params };
  }

  async run(): Promise<any> {
    for (const task of this.tasks) {
      this.params = await task.execute(this.params?.data);

      console.log(`Task ${task.name} executed with result: ${this.params?.status}`);
    }
  }
}
