import commander from 'commander';
import { workflowHandler } from './controllers/workflow.controller';
import { audioHandler, summaryHandler, transcriptionHandler } from './controllers/tasks.controller';

import { validateParams, ensureOutputDir } from './middlewares/common';

export const run = () => {
  const program = new commander.Command();

  program.version('0.1.0').description('Transcriptor CLI');

  program
    .command('workflow')
    .alias('transcribe')
    .description('Run the transcription process workflow')
    .argument('<videoPath>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(workflowHandler)));

  program
    .command('audio')
    .alias('extract')
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

  program
    .command('summary')
    .alias('summarize')
    .description('Run the summary extractor')
    .argument('<transcriptionPath>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(summaryHandler)));

  program.parse(process.argv);
};
