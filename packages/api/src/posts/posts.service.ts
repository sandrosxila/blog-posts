import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly post: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, title: string, content: string, image?: string) {
    const user = await this.usersService.findOne(Number(userId));

    if (!user) {
      throw new HttpException(
        `Couldn't find user with ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const post = this.post.create({
      content,
      title,
      user,
      image,
    });

    this.post.save(post);

    return post;
  }

  async findAll() {
    return await this.post.find({
      order: {
        postId: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.post.findOneBy({
      postId: id,
    });
  }

  async update(id: number, title: string, content: string, image: string) {
    return await this.post.save({
      postId: id,
      title,
      content,
      image,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
