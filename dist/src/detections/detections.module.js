"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectionsModule = void 0;
const common_1 = require("@nestjs/common");
const detections_controller_1 = require("./detections.controller");
let DetectionsModule = class DetectionsModule {
};
exports.DetectionsModule = DetectionsModule;
exports.DetectionsModule = DetectionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [detections_controller_1.DetectionsController],
    })
], DetectionsModule);
//# sourceMappingURL=detections.module.js.map