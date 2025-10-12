import { File } from './file.abstract';

export class TranscriptionFile extends File {
  public title: string;
  public text: string;

  constructor(args: any) {
    super(args);

    this.title = this.path;
    this.text = '';
  }

  public addTitle(title: string) {
    this.title = title;
  }

  public addText(text: string) {
    this.text = text;
  }
}
