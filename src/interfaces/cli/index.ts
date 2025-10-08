import commander from 'commander';
import { DummyTask } from '../../infrastructure/tasks/dummy.task.impl';
import { ExecuteWorkflow } from '../../application/use-cases/execute-workflow';

export const run = () => {
  const program = new commander.Command();

  program.version('0.1.0').description('Transcriptor CLI');

  program
    .command('run')
    .description('Run the transcription process')
    .action(async () => {
      const dummyTask = new DummyTask();
      const executeWorkflow = new ExecuteWorkflow([dummyTask]);

      await executeWorkflow.run();
    });

  program
    .command('dummy')
    .description('Run the dummy task')
    .action(async () => {
      const dummyTask = new DummyTask();

      await dummyTask.execute();
    });

  program
    .command('test')
    .description('Run test command')
    .action(() => {
      console.log('Test command executed');
    });

  program.parse(process.argv);
};
