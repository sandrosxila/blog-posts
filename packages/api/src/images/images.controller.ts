import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':name')
  findOne(@Param('name') name: string, @Res() res: Response) {
    const file = this.imagesService.getFile(name);
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    return new StreamableFile(file);
  }

  @Delete('/remove/:name')
  async deleteFromServer(@Param('name') name: string) {
    await this.imagesService.remove(name);
    return {
      success: true,
    };
  }

  @Delete('/:name')
  async deleteFromServerAndDatabase(@Param('name') name: string) {
    await this.imagesService.remove(name);
    await this.imagesService.removeFromDb(name);
    return {
      success: true,
    };
  }
}
