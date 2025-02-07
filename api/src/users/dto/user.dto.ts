import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  photo: string;
}
