import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseFilters,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { SignUpFilter } from './filters/sign-up.filter';
import { Response } from 'express';

@Controller('users')
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/photos',
        filename: (req, file, next) => {
          const name = randomBytes(32).toString('hex');
          next(null, `${name}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UseFilters(SignUpFilter)
  async signUp(@Body() body: SignUpUserDto, @Res() res: Response) {
    const { firstName, lastName, email, password, photo } = body;

    await this.authService.signUp(firstName, lastName, email, password, photo);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'data added successfully!!!',
    });
  }
}
