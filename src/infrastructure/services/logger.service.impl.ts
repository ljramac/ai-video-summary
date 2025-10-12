import { ILoggerService } from '../../application/services/logger.service';

export const logger: ILoggerService = {
  info: (message: string) => {
    console.info(`INFO: ${message}`);
  },
  log: (message: string) => {
    console.log(`LOG: ${message}`);
  },
  error: (message: string) => {
    console.error(`ERROR: ${message}`);
  },
};
