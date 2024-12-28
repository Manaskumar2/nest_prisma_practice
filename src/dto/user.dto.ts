// eslint-disable-next-line prettier/prettier
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must not exceed 30 characters' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must not exceed 30 characters' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}
export class ValidateIdDto {
  @IsMongoId({ message: 'Invalid user ID format' })
  id: string; // Assume you are passing the user ID as a parameter
}
