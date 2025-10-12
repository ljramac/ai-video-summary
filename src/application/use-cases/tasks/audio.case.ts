import { VideoFile } from '../../../domain/entities/video.file';
import { AudioFile } from '../../../domain/entities/audio.file';
import { ITranscoderService } from '../../../domain/services/transcoder.service';

export class ExtractAudioCase {
  private readonly audioExtractorService: ITranscoderService;

  constructor(audioExtractorService: ITranscoderService) {
    this.audioExtractorService = audioExtractorService;
  }
  async run(videoPath: string, outputDir: string): Promise<any> {
    const videoFile = new VideoFile(videoPath);

    const audioFile = new AudioFile(`${outputDir}/${videoFile.name}.m4a`);

    const result = await this.audioExtractorService.extractAudio(videoFile, audioFile);

    return { ...result, videoFile, audioFile };
  }
}
