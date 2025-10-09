import { exec } from 'child-process-promise';
import { VideoFile } from '../../domain/entities/video.file';
import { AudioFile } from '../../domain/entities/audio.file';
import { IAudioExtractorService } from '../../domain/services/audio-extractor.service';

export class AudioExtractorService implements IAudioExtractorService {
  async run(videoFile: VideoFile, audioFile: AudioFile): Promise<void> {
    const command = `ffmpeg -i '${videoFile.path}' -vn -acodec pcm_s16le -ar 44100 -ac 2 '${audioFile.path}'`;

    await exec(command);
  }
}
