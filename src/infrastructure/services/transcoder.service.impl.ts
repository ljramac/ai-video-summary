import fs from 'node:fs';
import { spawn, exec } from 'child-process-promise';
import { execSync } from 'child_process';
import path from 'path';
import { VideoFile } from '../../domain/entities/video.file';
import { AudioFile } from '../../domain/entities/audio.file';
import { ITranscoderService } from '../../domain/services/transcoder.service';

export class TranscoderService implements ITranscoderService {
  private async getAudioInfo(audioPath: string): Promise<{ duration: number; bitRate: number }> {
    const command = `ffprobe -v quiet -i "${audioPath}" -select_streams a:0 -show_entries stream=bit_rate,duration -of csv=p=0`;

    const { stdout } = await exec(command);

    const [duration, bitRate] = stdout.trim().split(',');

    return { duration: parseFloat(duration), bitRate: parseInt(bitRate) };
  }

  async cutBySize(audioPath: string, maxSizeBytes = 24_000_000): Promise<string[]> {
    const stats = fs.statSync(audioPath);

    if (stats.size <= maxSizeBytes) {
      return [audioPath];
    }

    const { duration, bitRate } = await this.getAudioInfo(audioPath);

    if (!duration || !bitRate) {
      throw new Error('Could not obtain audio duration or bitrate.');
    }

    const secondsPerPart = (maxSizeBytes * 8) / bitRate;
    const numParts = Math.ceil(duration / secondsPerPart);

    const audioFiles: string[] = [];

    for (let i = 0; i < numParts; i++) {
      const start = i * secondsPerPart;
      const end = Math.min((i + 1) * secondsPerPart, duration);
      const piecePath = audioPath.replace(/\.m4a$/, `-part${i + 1}.m4a`);

      const args = [
        '-i',
        audioPath,
        '-ss',
        start.toString(),
        '-to',
        end.toString(),
        '-c',
        'copy',
        piecePath,
      ];

      await spawn('ffmpeg', args, { stdio: 'inherit' });

      audioFiles.push(piecePath);
    }

    return audioFiles;
  }

  async extractAudio(videoFile: VideoFile, audioFile: AudioFile): Promise<any> {
    const args = [
      '-i',
      videoFile.path,
      '-vn',
      '-ac',
      '1',
      '-ar',
      '16000',
      '-c:a',
      'aac',
      '-b:a',
      '64k',
      audioFile.path.replace(/\.\w+$/, '.m4a'),
    ];

    await spawn('ffmpeg', args, { stdio: 'inherit' });

    return { videoFile, audioFile };
  }
}
