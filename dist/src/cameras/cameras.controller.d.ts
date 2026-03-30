import { CamerasService } from './cameras.service';
import { CreateCameraDto } from './dto/create-camera.dto';
export declare class CamerasController {
    private readonly camerasService;
    constructor(camerasService: CamerasService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CameraClient<{
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): Promise<false | {
        name: string;
        rtspUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
