import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Expose()
  userId: string;
  @IsString()
  @Expose()
  title: string;
  @IsString()
  content: string;
}
