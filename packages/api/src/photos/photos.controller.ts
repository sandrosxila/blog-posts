import {
  Controller,
  Get,
  Param,
  Delete,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Response } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('/:id/:name')
  getPhoto(
    @Param('id') id: string,
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const photo = this.photosService.getFile(id, name);
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    return new StreamableFile(photo);
  }

  @Delete('/:id/:name')
  remove(@Param('id') id: string, @Param('name') name: string) {
    return this.photosService.remove(id, name);
  }
}
