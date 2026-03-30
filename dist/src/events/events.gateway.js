"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsGateway = EventsGateway_1 = class EventsGateway {
    prisma;
    server;
    logger = new common_1.Logger(EventsGateway_1.name);
    redisSubscriber;
    constructor(prisma) {
        this.prisma = prisma;
    }
    afterInit() {
        this.logger.log('WebSocket Gateway Initialized');
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
        this.redisSubscriber = new ioredis_1.Redis(redisUrl);
        this.redisSubscriber.subscribe('detection_events', (err, count) => {
            if (err) {
                this.logger.error('Failed to subscribe to Redis channel', err);
            }
            else {
                this.logger.log(`Subscribed to Redis channel 'detection_events'. Active subscriptions: ${count}`);
            }
        });
        this.redisSubscriber.on('message', async (channel, message) => {
            if (channel === 'detection_events') {
                try {
                    const eventData = JSON.parse(message);
                    this.server.emit('face_recognized', eventData);
                    if (eventData.users && eventData.users.length > 0) {
                        const camera = await this.prisma.camera.findUnique({
                            where: { name: eventData.camera }
                        });
                        if (camera) {
                            const dt = new Date(eventData.timestamp);
                            const detections = eventData.users.map((user) => ({
                                cameraId: camera.id,
                                userId: user.id || null,
                                timestamp: dt,
                            }));
                            await this.prisma.detectionEvent.createMany({
                                data: detections,
                            });
                        }
                    }
                }
                catch (e) {
                    this.logger.error('Failed to parse or save detection event', e);
                }
            }
        });
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
exports.EventsGateway = EventsGateway = EventsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map