import { AbstractDTO } from './abstract.dto';

export class WorkflowDTO extends AbstractDTO {
  constructor(inputFile: string) {
    super(inputFile);
  }

  async validate(): Promise<void> {
    const isValidVideoPath = this.inputFile.match(/^.+\.(mp4|mkv|avi|mov|m4a|mp3|wav)$/i);

    if (!isValidVideoPath) {
      throw new Error('Invalid input file or output directory');
    }
  }
}
