export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type TaskParams = {
  status: TaskStatus;
  data?: any;
  error?: Error | string;
};
