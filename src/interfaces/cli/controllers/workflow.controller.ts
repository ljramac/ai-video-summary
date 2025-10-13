import { ExtractAudioTask } from '../../../infrastructure/tasks/audio.task.impl';
import { TranscriptionTask } from '../../../infrastructure/tasks/transcript.task.impl';
import { RunWorkflow } from '../../../application/use-cases/workflow.case';
import { TaskStatus, TaskParams } from '../../../application/workflow/types/task.types';
import { SummaryTask } from '../../../infrastructure/tasks/summary.task.impl';

export const workflowHandler = async (videoPath: string, outputDir: string) => {
  const extractAudioTask = new ExtractAudioTask();
  const transcriptionTask = new TranscriptionTask();
  const summaryTask = new SummaryTask();

  const runWorkflow = new RunWorkflow([extractAudioTask, transcriptionTask, summaryTask]);

  const params: TaskParams = { videoPath, outputDir, status: TaskStatus.PENDING };

  runWorkflow.addParams(params);

  const result = await runWorkflow.run();

  console.log('Workflow result:', result);
};
