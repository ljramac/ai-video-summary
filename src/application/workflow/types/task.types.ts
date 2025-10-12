export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type TaskParams = {
  status: TaskStatus;
  error?: Error | string;
  videoPath?: string;
  outputDir?: string;
  audioPath?: string;
  transcriptPath?: string;
  [key: string]: any;
};
