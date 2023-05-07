import { Controller, Get, Param, Delete, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { PostsService } from '../posts/posts.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly postsService: PostsService,
  ) {}

  @Get(':name')
  findOne(@Param('name') name: string, @Res() res: Response) {
    const file = this.imagesService.getFile(name);
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    file.pipe(res);
  }

  @Delete('/remove/:name')
  async delete(@Param('name') name: string) {
    await this.imagesService.remove(name);

    return {
      success: true,
    };
  }

  @Delete('/:name')
  async deleteFromServerAndDatabase(@Param('name') name: string) {
    await this.postsService.removeImage(name);
    try {
      await this.imagesService.remove(name);
    } catch (e) {
      console.log(e.message);
    }

    return {
      success: true,
    };
  }
}
