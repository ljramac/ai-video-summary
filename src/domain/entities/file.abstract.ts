import { parse as pathParse } from 'node:path';

export abstract class File {
  public readonly path: string;
  public readonly filename: string;
  public readonly ext: string;
  public readonly dir: string;
  public readonly name: string;

  constructor(path: string) {
    const { ext, base, dir, name } = pathParse(path);

    this.path = path;
    this.filename = base;
    this.name = name;
    this.ext = ext;
    this.dir = dir;
  }

  getPathWithoutExt(path: string): string {
    const { dir, name } = pathParse(path);

    return `${dir}/${name}`;
  }
}
