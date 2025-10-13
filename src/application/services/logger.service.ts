export interface ILoggerService {
  info(...args: any[]): void;
  log(...args: any[]): void;
  error(...args: any[]): void;
}
