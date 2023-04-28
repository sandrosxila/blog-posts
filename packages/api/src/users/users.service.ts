import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photo: string,
  ) {
    const user = this.user.create({
      firstName,
      lastName,
      email,
      password,
      photo,
    });

    return await this.user.save(user);
  }

  async findOne(id: number) {
    return await this.user.findOneBy({ userId: id });
  }

  async find(email: string) {
    return await this.user.findBy({ email });
  }

  async removeRecord(email: string, hash: string) {
    return await this.user.delete({
      email,
      password: hash,
    });
  }
}
