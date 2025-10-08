import { File } from './file.abstract';

export class VideoFile extends File {
  constructor(path: string) {
    super(path);
  }
}
