import { UsersService } from './users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogInUserDto } from './dto/log-in-user.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async logIn({ email, password }: LogInUserDto) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      return new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      return new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photo: string,
  ) {
    const [user] = await this.usersService.find(email);

    if (user) {
      throw new HttpException('Email is in use', HttpStatus.CONFLICT);
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const generatedPassword = salt + '.' + hash.toString('hex');

    await this.usersService.create(
      firstName,
      lastName,
      email,
      generatedPassword,
      photo,
    );

    return user;
  }
}
