import { ApiProperty } from '@nestjs/swagger';

export class CreateCameraDto {
  @ApiProperty({
    example: 'Lobby Webcam',
    description: 'The human-readable name of the camera stream',
  })
  name: string;

  @ApiProperty({
    example: '0',
    description: 'The RTSP stream URL or local device index (e.g. 0 for Macbook camera)',
  })
  rtspUrl: string;
}
