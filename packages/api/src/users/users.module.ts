import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { Post } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { PhotosService } from '../photos/photos.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    UploadedFileFilter,
    PostsService,
    PhotosService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
