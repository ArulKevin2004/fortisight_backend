import { PrismaService } from '../prisma/prisma.service';
import { CreateCameraDto } from './dto/create-camera.dto';
export declare class CamerasService {
    private prisma;
    private docker;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createCameraDto: CreateCameraDto): Promise<{
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CameraClient<{
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): Promise<false | {
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
