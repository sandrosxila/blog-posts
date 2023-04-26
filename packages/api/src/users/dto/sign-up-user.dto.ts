import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  photo: string;
}
