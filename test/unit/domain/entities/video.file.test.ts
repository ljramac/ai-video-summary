import { VideoFile } from '../../../../src/domain/entities/video.file';

describe('VideoFile', () => {
  it('should create an instance of VideoFile', () => {
    const filepath = 'path/to/video.mp4';
    const videoFile = new VideoFile(filepath);

    expect(videoFile).toBeInstanceOf(VideoFile);
  });
});
