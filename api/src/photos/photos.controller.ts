import { Controller, Get, Param, Delete, Res } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Response } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('/:name')
  getPhoto(@Param('name') name: string, @Res() res: Response) {
    const photo = this.photosService.getFile(name);
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    photo.pipe(res);
  }

  @Delete('/:name')
  remove(@Param('name') name: string) {
    return this.photosService.remove(name);
  }
}
