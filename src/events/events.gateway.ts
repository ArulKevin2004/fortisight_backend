import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);
  private redisSubscriber: Redis;

  constructor(private readonly prisma: PrismaService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized');
    
    // Connect to the shared Redis container
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
    this.redisSubscriber = new Redis(redisUrl);

    // Subscribe to the detection events channel
    this.redisSubscriber.subscribe('detection_events', (err, count) => {
      if (err) {
        this.logger.error('Failed to subscribe to Redis channel', err);
      } else {
        this.logger.log(`Subscribed to Redis channel 'detection_events'. Active subscriptions: ${count}`);
      }
    });

    // Listen for messages and broadcast them
    this.redisSubscriber.on('message', async (channel, message) => {
      if (channel === 'detection_events') {
        try {
          const eventData = JSON.parse(message);
          // Broadcast to all connected React/NestJS clients
          this.server.emit('face_recognized', eventData);

          // Save detection events to the database
          if (eventData.users && eventData.users.length > 0) {
            const camera = await this.prisma.camera.findUnique({
              where: { name: eventData.camera }
            });

            if (camera) {
              const dt = new Date(eventData.timestamp);
              const detections = eventData.users.map((user) => ({
                cameraId: camera.id,
                userId: user.id || null, // Might be null if Unknown face
                timestamp: dt,
              }));

              await this.prisma.detectionEvent.createMany({
                data: detections,
              });
            }
          }
        } catch (e) {
          this.logger.error('Failed to parse or save detection event', e);
        }
      }
    });
  }
}
