export interface IAbstractDTO {
  inputFile: string;
  validate(): void;
}

export class AbstractDTO implements IAbstractDTO {
  public readonly inputFile: string;

  constructor(inputFile: string) {
    this.inputFile = inputFile;
  }

  async validate(): Promise<void> {
    throw new Error('Method not implemented. Please implement validate() in the subclass.');
  }
}
