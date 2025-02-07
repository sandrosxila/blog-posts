import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PostsService } from '../posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [ImagesController],
  providers: [ImagesService, PostsService],
  exports: [ImagesService],
})
export class ImagesModule {}
