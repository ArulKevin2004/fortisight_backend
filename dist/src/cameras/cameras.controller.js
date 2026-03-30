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
exports.CamerasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cameras_service_1 = require("./cameras.service");
const create_camera_dto_1 = require("./dto/create-camera.dto");
let CamerasController = class CamerasController {
    camerasService;
    constructor(camerasService) {
        this.camerasService = camerasService;
    }
    create(createCameraDto) {
        return this.camerasService.create(createCameraDto);
    }
    findAll() {
        return this.camerasService.findAll();
    }
    findOne(id) {
        return this.camerasService.findOne(+id);
    }
    remove(id) {
        return this.camerasService.remove(+id);
    }
};
exports.CamerasController = CamerasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_camera_dto_1.CreateCameraDto]),
    __metadata("design:returntype", void 0)
], CamerasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CamerasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CamerasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CamerasController.prototype, "remove", null);
exports.CamerasController = CamerasController = __decorate([
    (0, swagger_1.ApiTags)('Cameras'),
    (0, common_1.Controller)('api/cameras'),
    __metadata("design:paramtypes", [cameras_service_1.CamerasService])
], CamerasController);
//# sourceMappingURL=cameras.controller.js.map