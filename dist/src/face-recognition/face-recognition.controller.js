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
exports.FaceRecognitionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let FaceRecognitionController = class FaceRecognitionController {
    pyBackendUrl = 'http://localhost:8000/api';
    async register(file, name) {
        if (!file)
            throw new common_1.HttpException('No image uploaded', common_1.HttpStatus.BAD_REQUEST);
        const formData = new FormData();
        formData.append('name', name);
        const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
        formData.append('image', blob, file.originalname);
        try {
            const response = await fetch(`${this.pyBackendUrl}/register`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error communicating with python backend', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addToBlacklist(file, name) {
        if (!file)
            throw new common_1.HttpException('No image uploaded', common_1.HttpStatus.BAD_REQUEST);
        const formData = new FormData();
        formData.append('name', name);
        const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
        formData.append('image', blob, file.originalname);
        try {
            const response = await fetch(`${this.pyBackendUrl}/blacklist`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error communicating with python backend', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBlacklist() {
        try {
            const response = await fetch(`${this.pyBackendUrl}/blacklist`);
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadVideo(file) {
        if (!file)
            throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
        const formData = new FormData();
        const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
        formData.append('file', blob, file.originalname);
        try {
            const response = await fetch(`${this.pyBackendUrl}/upload_video`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Upload failed', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async processCamera(payload) {
        try {
            const response = await fetch(`${this.pyBackendUrl}/process_camera`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async stopCamera(camName) {
        try {
            const response = await fetch(`${this.pyBackendUrl}/stop_camera/${camName}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (!response.ok)
                throw new common_1.HttpException(data, response.status);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FaceRecognitionController = FaceRecognitionController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('blacklist'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "addToBlacklist", null);
__decorate([
    (0, common_1.Get)('blacklist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "getBlacklist", null);
__decorate([
    (0, common_1.Post)('upload_video'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Post)('process_camera'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "processCamera", null);
__decorate([
    (0, common_1.Post)('stop_camera/:cam_name'),
    __param(0, (0, common_1.Param)('cam_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FaceRecognitionController.prototype, "stopCamera", null);
exports.FaceRecognitionController = FaceRecognitionController = __decorate([
    (0, swagger_1.ApiTags)('Face Recognition Proxy'),
    (0, common_1.Controller)('api/face-recognition')
], FaceRecognitionController);
//# sourceMappingURL=face-recognition.controller.js.map