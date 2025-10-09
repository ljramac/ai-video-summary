import { VideoFile } from '../entities/video.file';
import { AudioFile } from '../entities/audio.file';

export interface IAudioExtractorService {
  run(videoFile: VideoFile, audioFile: AudioFile): Promise<void>;
}
