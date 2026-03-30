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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CamerasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dockerode_1 = __importDefault(require("dockerode"));
let CamerasService = CamerasService_1 = class CamerasService {
    prisma;
    docker;
    logger = new common_1.Logger(CamerasService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
        this.docker = new dockerode_1.default({ socketPath: '/var/run/docker.sock' });
    }
    async create(createCameraDto) {
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
        }
        catch (error) {
            this.logger.error(`Failed to start Docker container for ${camera.name}`, error);
            await this.prisma.camera.update({ where: { id: camera.id }, data: { isActive: false } });
            throw error;
        }
        return camera;
    }
    findAll() {
        return this.prisma.camera.findMany();
    }
    findOne(id) {
        return this.prisma.camera.findUnique({ where: { id } });
    }
    async remove(id) {
        const camera = await this.findOne(id);
        if (!camera)
            return false;
        const containerName = `fortisight-worker-cam-${camera.id}`;
        try {
            const container = this.docker.getContainer(containerName);
            await container.stop();
            await container.remove();
            this.logger.log(`Stopped/removed Docker Worker for Camera ${camera.id}`);
        }
        catch (error) {
            this.logger.warn(`Could not deeply remove container ${containerName}`);
        }
        return this.prisma.camera.delete({ where: { id } });
    }
};
exports.CamerasService = CamerasService;
exports.CamerasService = CamerasService = CamerasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CamerasService);
//# sourceMappingURL=cameras.service.js.map