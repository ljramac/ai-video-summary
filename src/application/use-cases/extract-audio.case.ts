import { VideoFile } from '../../domain/entities/video.file';
import { AudioFile } from '../../domain/entities/audio.file';
import { IAudioExtractorService } from '../../domain/services/audio-extractor.service';

export class ExtractAudioCase {
  private readonly audioExtractorService: IAudioExtractorService;

  constructor(audioExtractorService: IAudioExtractorService) {
    this.audioExtractorService = audioExtractorService;
  }
  async run(videoPath: string, outputDir: string): Promise<void> {
    const videoFile = new VideoFile(videoPath);

    const audioFile = new AudioFile(`${outputDir}/${videoFile.name}.wav`);

    const result = await this.audioExtractorService.run(videoFile, audioFile);

    return result;
  }
}
