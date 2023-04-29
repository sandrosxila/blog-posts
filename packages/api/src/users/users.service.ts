import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Post) private readonly post: Repository<Post>,
  ) {}

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

  async getPosts(id: number) {
    return await this.post.find({
      where: {
        user: {
          userId: id,
        },
      },
    });
  }

  async addPost(user: User, post: Post) {
    user.posts.push(post);
    this.user.save(user);
  }

  async findOne(id: number) {
    return await this.user.findOneBy({ userId: id });
  }

  async find(email: string) {
    return await this.user.findBy({ email });
  }

  async update(id: number, userData: UpdateUserDto) {
    return await this.user.save({
      userId: id,
      ...userData,
    });
  }

  async removeRecord(email: string, hash: string) {
    return await this.user.delete({
      email,
      password: hash,
    });
  }
}
