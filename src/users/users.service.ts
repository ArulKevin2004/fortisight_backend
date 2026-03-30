import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    // Hide embeddings as they are enormous math vectors
    return this.prisma.user.findMany({ select: { id: true, name: true, is_blacklisted: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: { id: true, name: true, is_blacklisted: true } });
  }
}
