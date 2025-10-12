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
      console.log(`Running task: ${task.name}`);

      const outputParams = await task.run(this.params);

      this.addParams(outputParams);

      if (this.params?.status === TaskStatus.FAILED) {
        console.error(`Workflow stopped due to failure in task: ${task.name}`);
        console.error(this.params?.error);

        break;
      }
    }

    return this.params?.status;
  }
}
