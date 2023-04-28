import {
  Controller,
  Post,
  Body,
  UseFilters,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { FileUploader } from 'src/interceptors/file-uploader.interceptor';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async logIn(@Body() logInUserDto: LogInUserDto, @Res() res: Response) {
    const user = await this.authService.logIn(logInUserDto);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      userData: user,
      message: 'Credentials Match.',
    });
  }

  @Post('/signup')
  @FileUploader('./uploads/photos')
  @UseFilters(UploadedFileFilter)
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    const { firstName, lastName, email, password, photo } = body;

    await this.authService.signUp(firstName, lastName, email, password, photo);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'data added successfully!!!',
    });
  }
}
