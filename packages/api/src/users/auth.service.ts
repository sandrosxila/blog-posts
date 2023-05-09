import { UsersService } from './users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogInUserDto } from './dto/log-in-user.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn({ email, password }: LogInUserDto) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
    }

    const payload = {
      sub: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photo?: string,
  ) {
    const [user] = await this.usersService.find(email);

    if (user) {
      throw new HttpException('Email is in use', HttpStatus.CONFLICT);
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const generatedPassword = salt + '.' + hash.toString('hex');

    return await this.usersService.create(
      firstName,
      lastName,
      email,
      generatedPassword,
      photo,
    );
  }

  async refresh(payload: {
    sub: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
  }) {
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }
}
