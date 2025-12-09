import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../../users/entities/user.entity/user.entity'; 

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsEnum(UserRole, { message: 'Invalid role.' })
  role?: UserRole = UserRole.CLIENT;
}