import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly post: Repository<Post>,
  ) {}

  async create(user: User, title: string, content: string, image?: string) {
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

  async findPostsByUserId(id: number) {
    return await this.post.find({
      where: {
        user: {
          userId: id,
        },
      },
    });
  }

  async update(id: number, title: string, content: string, image?: string) {
    return await this.post.save({
      postId: id,
      title,
      content,
      image,
    });
  }

  async removeImage(image: string) {
    return await this.post
      .createQueryBuilder()
      .update()
      .set({ image: null })
      .where('image = :image', { image })
      .execute();
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    try {
      await unlink(join(process.cwd(), `/uploads/images/${post.image}`));
    } catch (e) {
      console.log(e);
    }

    return await this.post.remove(post);
  }
}
