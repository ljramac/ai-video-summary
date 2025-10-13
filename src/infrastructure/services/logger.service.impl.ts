import { ILoggerService } from '../../application/services/logger.service';

const parseArgs = (args: any[]): string => {
  return args
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      }
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    })
    .join('');
};

export const logger: ILoggerService = {
  info: (...args) => {
    console.info(`\x1b[32m[INFO]\x1b[0m ${parseArgs(args)}`);
  },
  log: (...args) => {
    console.log(`\x1b[36m[LOG]\x1b[0m ${parseArgs(args)}`);
  },
  error: (...args) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${parseArgs(args)}`);
  },
};
