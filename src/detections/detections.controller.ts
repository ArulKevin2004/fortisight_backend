/** DetectionEventsController — expose /api/detections for the frontend */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Detection Events')
@Controller('api/detections')
export class DetectionsController {
  constructor(private readonly prisma: PrismaService) {}

  /** GET /api/detections?limit=50
   *  Returns the latest detection events, most-recent first,
   *  with the associated user and camera names joined.
   */
  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('limit') limit = '50') {
    return this.prisma.detectionEvent.findMany({
      take: Math.min(Number(limit), 500),
      orderBy: { timestamp: 'desc' },
      include: {
        user:   { select: { id: true, name: true, is_blacklisted: true } },
        camera: { select: { id: true, name: true } },
      },
    });
  }
}
