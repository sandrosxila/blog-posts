import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { FileUploader } from '../interceptors/file-uploader.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Serialize(CreatePostDto)
  @FileUploader('./uploads/images')
  @UseFilters(UploadedFileFilter)
  async create(
    @Body() { userId, title, content }: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file.filename;
    return await this.postsService.create(userId, title, content, image);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(Number(id));

    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @Put(':id')
  @FileUploader('./uploads/images')
  @UseFilters(UploadedFileFilter)
  async update(
    @Param('id') id: string,
    @Body() { title, content }: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne(Number(id));
    if (!post) {
      throw new HttpException(
        `Couldn't find a post with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const image = post.image;

    return await this.postsService.update(Number(id), title, content, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
