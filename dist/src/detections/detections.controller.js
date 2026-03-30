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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
let DetectionsController = class DetectionsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(limit = '50') {
        return this.prisma.detectionEvent.findMany({
            take: Math.min(Number(limit), 500),
            orderBy: { timestamp: 'desc' },
            include: {
                user: { select: { id: true, name: true, is_blacklisted: true } },
                camera: { select: { id: true, name: true } },
            },
        });
    }
};
exports.DetectionsController = DetectionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DetectionsController.prototype, "findAll", null);
exports.DetectionsController = DetectionsController = __decorate([
    (0, swagger_1.ApiTags)('Detection Events'),
    (0, common_1.Controller)('api/detections'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DetectionsController);
//# sourceMappingURL=detections.controller.js.map