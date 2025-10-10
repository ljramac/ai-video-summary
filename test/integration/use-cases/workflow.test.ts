import path from 'node:path';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { TaskStatus } from '../../../src/application/workflow/types/task.types';
import { ExtractAudioTask } from '../../../src/infrastructure/workflow/audio.task.impl';
import { RunWorkflow } from '../../../src/application/use-cases/workflow.case';

describe('RunWorkflow', () => {
  const outputDir = path.join(path.resolve('.'), 'data/test');
  const videoPath = `${outputDir}/test-video.mp4`;

  beforeAll(() => {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }

    fs.mkdirSync(outputDir, { recursive: true });

    const args = [
      '-y',
      '-f',
      'lavfi',
      '-i',
      'sine=frequency=1000:duration=0.2',
      '-f',
      'lavfi',
      '-i',
      'anullsrc=channel_layout=mono:sample_rate=44100:d=0.8',
      '-filter_complex',
      '[0:a][1:a]concat=n=2:v=0:a=1[aout]',
      '-f',
      'lavfi',
      '-i',
      'color=c=black:s=16x16:d=1',
      '-map',
      '2:v',
      '-map',
      '[aout]',
      '-c:v',
      'libx264',
      '-c:a',
      'aac',
      '-b:a',
      '32k',
      '-pix_fmt',
      'yuv420p',
      '-shortest',
      videoPath,
    ];

    const result = spawnSync('ffmpeg', args, { stdio: 'inherit' });

    if (result.status !== 0) {
      throw new Error(`FFmpeg failed with code ${result.status}`);
    }
  });

  it('should create an instance of RunWorkflow', async () => {
    const tasks = [new ExtractAudioTask()];
    const runWorkflow = new RunWorkflow(tasks);

    runWorkflow.addParams({
      data: {
        videoPath,
        outputDir,
      },
      status: TaskStatus.PENDING,
    });

    const result = await runWorkflow.run();

    expect(result).toBe(TaskStatus.COMPLETED);
  });
});
