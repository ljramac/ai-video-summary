import { IFileSystemService } from '../../application/services/filesystem.service';
import fs from 'node:fs/promises';
import { parse as pathParse } from 'path';

export class FileSystemService implements IFileSystemService {
  createDir(path: string): void {
    throw new Error('Not implemented');
  }

  deleteFile(path: string): void {
    throw new Error('Not implemented');
  }

  moveFile(src: string, dest: string): void {
    throw new Error('Not implemented');
  }

  async ensureOutputDir(path: string): Promise<string> {
    const { dir, name, ext } = pathParse(path);

    const candidate = `${dir}${!ext ? `/${name}` : ''}`;

    const stat = await fs.stat(candidate).catch(() => null);

    if (!stat) {
      await fs.mkdir(candidate, { recursive: true });
    }

    return candidate;
  }
}
