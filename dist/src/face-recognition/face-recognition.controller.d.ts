export declare class FaceRecognitionController {
    private readonly pyBackendUrl;
    register(file: Express.Multer.File, name: string): Promise<any>;
    addToBlacklist(file: Express.Multer.File, name: string): Promise<any>;
    getBlacklist(): Promise<any>;
    uploadVideo(file: Express.Multer.File): Promise<any>;
    processCamera(payload: {
        cam_name: string;
        source: string;
    }): Promise<any>;
    stopCamera(camName: string): Promise<any>;
}
