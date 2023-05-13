import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './jwt-payload';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(user: User) {
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

  async refresh(payload: JwtPayload) {
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async login(user: { email: string; userId: number }) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
