import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { PhotosModule } from './photos/photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'api-data-source';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    ImagesModule,
    PhotosModule,
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
