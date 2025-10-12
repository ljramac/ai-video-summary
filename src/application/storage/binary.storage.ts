export interface IBinaryService {
  createDir(path: string): void;
  createFile(path: string, data: string): Promise<void>;
  deleteFile(path: string): void;
  moveFile(src: string, dest: string): void;
  ensureOutputDir(path: string): void;
}
