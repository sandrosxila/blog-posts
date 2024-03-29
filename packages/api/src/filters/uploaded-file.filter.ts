import {
  Catch,
  BadRequestException,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { unlink } from 'fs/promises';

@Catch(BadRequestException, HttpException)
export class UploadedFileFilter implements ExceptionFilter {
  async catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const { file } = request;

    console.log(file);

    if (file) {
      try {
        await unlink(file.path);
      } catch (err) {
        console.log('error');
        console.log(err);
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
