export interface IRunDto {
  inputFile: string;
}

export class RunDto implements IRunDto {
  public readonly inputFile: string;

  constructor(inputFile: string) {
    this.inputFile = inputFile;
  }

  async validate(): Promise<void> {
    const isValidVideoPath = this.inputFile.match(/^.+\.(mp4|mkv|avi|mov|m4a|mp3|wav)$/i);

    if (!isValidVideoPath) {
      throw new Error('Invalid input file or output directory');
    }
  }
}
