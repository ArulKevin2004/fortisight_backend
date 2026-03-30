import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import Docker from 'dockerode';

@Injectable()
export class CamerasService {
  private docker: Docker;
  private readonly logger = new Logger(CamerasService.name);

  constructor(private prisma: PrismaService) {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  async create(createCameraDto: CreateCameraDto) {
    const camera = await this.prisma.camera.create({
      data: {
        name: createCameraDto.name,
        rtspUrl: createCameraDto.rtspUrl,
        isActive: true,
      },
    });

    const containerName = `fortisight-worker-cam-${camera.id}`;
    
    try {
      const container = await this.docker.createContainer({
        Image: 'fortisight-face-recognition-worker-front-door',
        name: containerName,
        Env: [
          `REDIS_URL=redis://fortisight-redis:6379/0`,
          `CAM_NAME=${camera.name}`,
          `RTSP_URL=${camera.rtspUrl}`,
          `SEND_FPS=5`,
        ],
        HostConfig: {
          NetworkMode: 'fortisight-face-recognition_default',
          RestartPolicy: { Name: 'unless-stopped' },
          Binds: [
            '/Users/arulkevin/Desktop/Fortisight/fortisight-face-recognition/uploads:/app/uploads'
          ],
        },
        Cmd: ['python', 'camera_worker.py'],
      });

      await container.start();
      this.logger.log(`Started Docker Worker for Camera ${camera.id}`);
    } catch (error) {
      this.logger.error(`Failed to start Docker container for ${camera.name}`, error);
      await this.prisma.camera.update({ where: { id: camera.id }, data: { isActive: false } });
      throw error;
    }

    return camera;
  }

  findAll() {
    return this.prisma.camera.findMany();
  }

  findOne(id: number) {
    return this.prisma.camera.findUnique({ where: { id } });
  }

  async remove(id: number) {
    const camera = await this.findOne(id);
    if (!camera) return false;

    const containerName = `fortisight-worker-cam-${camera.id}`;
    try {
      const container = this.docker.getContainer(containerName);
      await container.stop();
      await container.remove();
      this.logger.log(`Stopped/removed Docker Worker for Camera ${camera.id}`);
    } catch (error) {
      this.logger.warn(`Could not deeply remove container ${containerName}`);
    }

    return this.prisma.camera.delete({ where: { id } });
  }
}
