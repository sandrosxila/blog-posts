import {
  Controller,
  Post,
  Body,
  UseFilters,
  Res,
  HttpStatus,
  Get,
  Param,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { FileUploader } from '../interceptors/file-uploader.interceptor';
import { PostsService } from 'src/posts/posts.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhotosService } from 'src/photos/photos.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
    private readonly photosService: PhotosService,
  ) {}

  @Serialize(UserDto)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(Number(id));
  }

  @Get('/:id/posts')
  async getPost(@Param('id') id: string) {
    const posts = await this.postsService.findPostsByUserId(Number(id));
    return posts;
  }

  @Serialize(UserDto)
  @Post('/login')
  async logIn(@Body() logInUserDto: LogInUserDto) {
    const user = await this.authService.logIn(logInUserDto);

    return user;
  }

  @Post('/signup')
  @FileUploader('./uploads/photos')
  @UseFilters(UploadedFileFilter)
  async signUp(
    @Body() body: CreateUserDto,
    @Res() res: Response,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const { firstName, lastName, email, password } = body;

    await this.authService.signUp(
      firstName,
      lastName,
      email,
      password,
      file.filename,
    );

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      userData: {
        firstName,
        lastName,
        email,
        photo: file.filename,
      },
      message: 'data added successfully!!!',
    });
  }

  @Serialize(UserDto)
  @Put('/:id')
  @FileUploader('./uploads/photos')
  @UseFilters(UploadedFileFilter)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { photo } = await this.usersService.findOne(Number(id));

    const user = await this.usersService.update(
      Number(id),
      Object.assign(body, { photo: file.filename }),
    );

    try {
      await this.photosService.remove(photo);
    } catch (e) {
      console.log(e.message);
    }

    return user;
  }
}
