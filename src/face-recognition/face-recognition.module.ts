import { Module } from '@nestjs/common';
import { FaceRecognitionController } from './face-recognition.controller';

@Module({
  controllers: [FaceRecognitionController],
})
export class FaceRecognitionModule {}
