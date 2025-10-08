import { IFileSystemService } from '../../application/services/filesystem.service';
import fs from 'fs';

export class FileSystemService implements IFileSystemService {
  createDir(path: string): void {
    fs.mkdirSync(path, { recursive: true });
  }

  deleteFile(path: string): void {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }

  moveFile(src: string, dest: string): void {
    fs.renameSync(src, dest);
  }
}
