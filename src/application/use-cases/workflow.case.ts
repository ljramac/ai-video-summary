import { TaskParams, TaskStatus } from '../workflow/types/task.types';
import { ITask } from '../workflow/task.interface';

export class RunWorkflow {
  private params: TaskParams = { status: TaskStatus.PENDING };
  constructor(private tasks: ITask[]) {}

  addParams(params: TaskParams) {
    this.params = { ...this.params, ...params };
  }

  async run(): Promise<any> {
    for (const task of this.tasks) {
      this.params = await task.run(this.params?.data);

      console.log(`Task ${task.name} executed with result: ${this.params?.status}`);

      if (this.params?.status === TaskStatus.FAILED) {
        console.error(`Workflow stopped due to failure in task: ${task.name}`);
        console.error(this.params?.error);

        break;
      }
    }
  }
}
