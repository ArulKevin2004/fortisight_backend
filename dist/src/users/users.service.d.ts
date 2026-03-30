import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string | null;
        id: number;
        is_blacklisted: boolean;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: number;
        is_blacklisted: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
