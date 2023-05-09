import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { UploadedFileFilter } from '../filters/uploaded-file.filter';
import { Post } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { PhotosService } from '../photos/photos.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    UploadedFileFilter,
    PostsService,
    PhotosService,
  ],
})
export class UsersModule {}
