import { TaskParams, TaskStatus } from '../workflow/types/task.types';
import { ITask } from '../workflow/task.interface';

export class RunWorkflow {
  private params: TaskParams = { status: TaskStatus.PENDING };
  constructor(private tasks: ITask[]) {}

  addParams(params: TaskParams) {
    this.params = { ...this.params, ...params };
  }

  setWorkflowStatus(status: TaskStatus) {
    this.params.status = status;
  }

  setWorkflowError(error: any) {
    this.params.error = error;
  }

  setTaskStatus(taskName: string, status: TaskStatus) {
    this.params[taskName] = { ...this.params[taskName], status };
  }

  setTaskError(taskName: string, error: any) {
    this.params[taskName] = { ...this.params[taskName], error };
  }

  async run(): Promise<any> {
    try {
      this.setWorkflowStatus(TaskStatus.RUNNING);

      for (const task of this.tasks) {
        const outputParams = await task.run(this.params);

        this.addParams(outputParams);

        this.setTaskStatus(task.name, outputParams.status);

        if (outputParams.status === TaskStatus.FAILED) {
          this.setTaskError(task.name, outputParams.error);
        }
      }

      const taskNames = this.tasks.map((t) => t.name);

      const allTasksCompleted = taskNames.every(
        (name) => this.params[name]?.status === TaskStatus.COMPLETED,
      );

      this.setWorkflowStatus(allTasksCompleted ? TaskStatus.COMPLETED : TaskStatus.FAILED);

      return this.params;
    } catch (error) {
      this.setWorkflowStatus(TaskStatus.FAILED);
      this.setWorkflowError(error);
    }

    return this.params;
  }
}
