import { Controller, Post, Get, Body, Param, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Face Recognition Proxy')
@Controller('api/face-recognition')
export class FaceRecognitionController {
  private readonly pyBackendUrl = 'http://localhost:8000/api';

  @Post('register')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
  })
  @UseInterceptors(FileInterceptor('image'))
  async register(@UploadedFile() file: Express.Multer.File, @Body('name') name: string) {
    if (!file) throw new HttpException('No image uploaded', HttpStatus.BAD_REQUEST);

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
      if (!response.ok) throw new HttpException(data, response.status);
      return data;
    } catch (error: any) {
       throw new HttpException(error.message || 'Error communicating with python backend', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('blacklist')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
  })
  @UseInterceptors(FileInterceptor('image'))
  async addToBlacklist(@UploadedFile() file: Express.Multer.File, @Body('name') name: string) {
    if (!file) throw new HttpException('No image uploaded', HttpStatus.BAD_REQUEST);

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
      if (!response.ok) throw new HttpException(data, response.status);
      return data;
    } catch (error: any) {
       throw new HttpException(error.message || 'Error communicating with python backend', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('blacklist')
  async getBlacklist() {
    try {
      const response = await fetch(`${this.pyBackendUrl}/blacklist`);
      const data = await response.json();
      if (!response.ok) throw new HttpException(data, response.status);
      return data;
    } catch (error) {
      throw new HttpException(error.message || 'Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload_video')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    try {
      const response = await fetch(`${this.pyBackendUrl}/upload_video`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new HttpException(data, response.status);
      return data; // { path: '/absolute/path/to/file.mp4', filename: 'file.mp4' }
    } catch (error: any) {
      throw new HttpException(error.message || 'Upload failed', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('process_camera')
  async processCamera(@Body() payload: { cam_name: string; source: string }) {
    try {
      const response = await fetch(`${this.pyBackendUrl}/process_camera`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new HttpException(data, response.status);
      return data;
    } catch (error) {
      throw new HttpException(error.message || 'Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('stop_camera/:cam_name')
  async stopCamera(@Param('cam_name') camName: string) {
    try {
      const response = await fetch(`${this.pyBackendUrl}/stop_camera/${camName}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) throw new HttpException(data, response.status);
      return data;
    } catch (error) {
      throw new HttpException(error.message || 'Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
