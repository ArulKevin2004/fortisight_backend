import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
export declare class EventsGateway implements OnGatewayInit {
    private readonly prisma;
    server: Server;
    private readonly logger;
    private redisSubscriber;
    constructor(prisma: PrismaService);
    afterInit(): void;
}
