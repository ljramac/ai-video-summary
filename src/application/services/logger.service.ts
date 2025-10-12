export interface ILoggerService {
  info(message: string): void;
  log(message: string): void;
  error(message: string): void;
}
