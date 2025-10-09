import { File } from './file.abstract';

export class AudioFile extends File {
  constructor(path: string) {
    super(path);
  }
}
