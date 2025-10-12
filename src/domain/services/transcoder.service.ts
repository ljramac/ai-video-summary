import { VideoFile } from '../entities/video.file';
import { AudioFile } from '../entities/audio.file';

export interface ITranscoderService {
  extractAudio(videoFile: VideoFile, audioFile: AudioFile): Promise<any>;
}
