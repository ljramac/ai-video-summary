export interface ITask {
  name: string;
  run(data: any): Promise<any>;
}
