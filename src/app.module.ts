import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CamerasModule } from './cameras/cameras.module';
import { UsersModule } from './users/users.module';
import { FaceRecognitionModule } from './face-recognition/face-recognition.module';
import { EventsGateway } from './events/events.gateway';
import { DetectionsModule } from './detections/detections.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CamerasModule, UsersModule, FaceRecognitionModule, DetectionsModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}

