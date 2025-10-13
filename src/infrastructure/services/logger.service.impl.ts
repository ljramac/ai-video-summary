import { ILoggerService } from '../../application/services/logger.service';

export const logger: ILoggerService = {
  info: (message: string) => {
    console.info(`\x1b[32m[INFO]\x1b[0m ${message}`);
  },
  log: (message: string) => {
    console.log(`\x1b[36m[LOG]\x1b[0m ${message}`);
  },
  error: (message: string) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
  },
};
