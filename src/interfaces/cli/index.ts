import commander from 'commander';
import { workflowHandler } from './controllers/workflow.controller';
import { audioHandler, transcriptionHandler } from './controllers/tasks.controller';

import { validateParams, ensureOutputDir } from './middlewares/common';

export const run = () => {
  const program = new commander.Command();

  program.version('0.1.0').description('Transcriptor CLI');

  program
    .command('workflow')
    .description('Run the transcription process workflow')
    .argument('<videoPath>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(workflowHandler)));

  program
    .command('audio')
    .description('Run the audio extractor')
    .argument('<videoPath>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(audioHandler)));

  program
    .command('transcript')
    .description('Run the transcript extractor')
    .argument('<videoPath>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(transcriptionHandler)));

  program.parse(process.argv);
};
