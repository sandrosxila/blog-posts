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
  ParseFilePipe,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { Response } from 'express';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { FileUploader } from '../interceptors/file-uploader.interceptor';
import { PostsService } from '../posts/posts.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhotosService } from '../photos/photos.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';
import { ReqUser } from 'decorators/req-user.decorator';
import { JwtPayload } from '../auth/jwt-payload';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
    private readonly photosService: PhotosService,
  ) {}

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/posts')
  async getPost(@Param('id') id: string) {
    const posts = await this.postsService.findPostsByUserId(Number(id));
    return posts;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(
    @ReqUser()
    user: User,
  ) {
    return await this.authService.logIn(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  async refresh(
    @ReqUser()
    user: JwtPayload,
  ) {
    return await this.authService.refresh(user);
  }

  @Post('/signup')
  @FileUploader('./uploads/photos')
  @UseFilters(UploadedFileFilter)
  async signUp(
    @Body() body: CreateUserDto,
    @Res() res: Response,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const { firstName, lastName, email, password } = body;

    const user = await this.authService.signUp(
      firstName,
      lastName,
      email,
      password,
      file?.filename,
    );

    const jwtPayload = await this.authService.logIn(user);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      userData: {
        userId: user.userId,
        firstName,
        lastName,
        email,
        photo: file.filename,
      },
      message: 'data added successfully!!!',
      ...jwtPayload,
    });
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @FileUploader('./uploads/photos')
  @UseFilters(UploadedFileFilter)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const shouldReplacePhoto = !!file?.filename;

    const { photo = null } = shouldReplacePhoto
      ? await this.usersService.findOne(Number(id))
      : {};

    const user = await this.usersService.update(
      Number(id),
      Object.assign(body, shouldReplacePhoto ? { photo: file.filename } : {}),
    );

    try {
      if (photo && shouldReplacePhoto) {
        await this.photosService.remove(photo);
      }
    } catch (e) {
      console.log(e.message);
    }

    return user;
  }
}
