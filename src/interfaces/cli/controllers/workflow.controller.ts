import { ExtractAudioTask } from '../../../infrastructure/tasks/audio.task.impl';
import { TranscriptionTask } from '../../../infrastructure/tasks/transcript.task.impl';
import { RunWorkflow } from '../../../application/use-cases/workflow.case';
import { TaskStatus, TaskParams } from '../../../application/workflow/types/task.types';

export const workflowHandler = async (videoPath: string, outputDir: string) => {
  const extractAudioTask = new ExtractAudioTask();
  const transcriptionTask = new TranscriptionTask();

  const runWorkflow = new RunWorkflow([extractAudioTask, transcriptionTask]);

  const params: TaskParams = { videoPath, outputDir, status: TaskStatus.PENDING };

  runWorkflow.addParams(params);

  await runWorkflow.run();
};
