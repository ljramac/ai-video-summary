import { IBinaryService } from '../../application/storage/binary.storage';
import fs from 'node:fs/promises';
import { parse as pathParse } from 'path';

export class FileSystemService implements IBinaryService {
  async createFile(path: string, data: string): Promise<void> {
    const dirExists = await fs.stat(path).catch(() => null);

    if (!dirExists) {
      await fs.mkdir(pathParse(path).dir, { recursive: true });
    }

    return fs.writeFile(path, data);
  }

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
