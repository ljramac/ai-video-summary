export interface IFileSystemService {
  createDir(path: string): void;
  deleteFile(path: string): void;
  moveFile(src: string, dest: string): void;
}
