export interface ITask {
  name: string;
  execute(data: any): Promise<any>;
}
