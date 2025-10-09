import commander from 'commander';
import {
  runHandler,
  audioHandler,
  ensureOutputDir,
  validateParams,
} from './controllers/run.controller';

export const run = () => {
  const program = new commander.Command();

  program.version('0.1.0').description('Transcriptor CLI');

  program
    .command('run')
    .description('Run the transcription process')
    .argument('<inputFile>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(runHandler)));

  program
    .command('audio')
    .description('Run the audio extractor')
    .argument('<inputFile>', 'Input file path')
    .argument('[outputDir]', 'Output directory path')
    .action(validateParams(ensureOutputDir(audioHandler)));

  program.parse(process.argv);
};
