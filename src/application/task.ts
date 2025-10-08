export interface ITask {
  name: string;
  execute(data: any): Promise<any>;
}

export interface IParams {
  status?: string;
  data?: any;
}
