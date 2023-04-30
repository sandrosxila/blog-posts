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
import { UsersService } from 'src/users/users.service';
import { ImagesService } from 'src/images/images.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @Serialize(CreatePostDto)
  @FileUploader('./uploads/images')
  @UseFilters(UploadedFileFilter)
  async create(
    @Body() { userId, title, content }: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file.filename;
    const user = await this.usersService.findOne(Number(userId));

    if (!user) {
      throw new HttpException(
        `Couldn't find user with ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.postsService.create(user, title, content, image);
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
    @UploadedFile() file: Express.Multer.File,
  ) {
    const post = await this.postsService.findOne(Number(id));
    if (!post) {
      throw new HttpException(
        `Couldn't find a post with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const image = post.image;

    const newPost = await this.postsService.update(
      Number(id),
      title,
      content,
      file?.filename ?? null,
    );

    try {
      await this.imagesService.remove(image);
    } catch (e) {
      console.log(e.message);
    }

    return newPost;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}
