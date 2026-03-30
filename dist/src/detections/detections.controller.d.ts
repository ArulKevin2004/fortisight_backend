import { PrismaService } from '../prisma/prisma.service';
export declare class DetectionsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(limit?: string): Promise<({
        user: {
            name: string | null;
            id: number;
            is_blacklisted: boolean;
        } | null;
        camera: {
            name: string;
            id: number;
        } | null;
    } & {
        id: number;
        timestamp: Date;
        userId: number | null;
        cameraId: number | null;
    })[]>;
}
