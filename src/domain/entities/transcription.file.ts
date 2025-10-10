import { File } from './file.abstract';

export class TranscriptionFile extends File {
  public title: string;
  public text: string;

  constructor(args: any) {
    super(args);

    this.title = this.path;
    this.text = '';
  }

  protected addTitle(title: string) {
    this.title = title;
  }

  protected addText(text: string) {
    this.text = text;
  }
}
