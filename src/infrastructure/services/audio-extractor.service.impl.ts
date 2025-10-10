import { spawn } from 'child-process-promise';
import { VideoFile } from '../../domain/entities/video.file';
import { AudioFile } from '../../domain/entities/audio.file';
import { IAudioExtractorService } from '../../domain/services/audio.service';

export class AudioExtractorService implements IAudioExtractorService {
  async run(videoFile: VideoFile, audioFile: AudioFile): Promise<any> {
    // args separados: evita problemas con espacios en paths
    const args = [
      '-i',
      videoFile.path,
      '-vn',
      '-acodec',
      'pcm_s16le',
      '-ar',
      '44100',
      '-ac',
      '2',
      audioFile.path,
    ];

    await spawn('ffmpeg', args, { stdio: 'inherit' });

    return { videoFile, audioFile };
  }
}
