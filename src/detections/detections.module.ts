import { Module } from '@nestjs/common';
import { DetectionsController } from './detections.controller';

@Module({
  controllers: [DetectionsController],
})
export class DetectionsModule {}
