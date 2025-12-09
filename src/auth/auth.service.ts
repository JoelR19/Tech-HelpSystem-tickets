
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { User, UserRole } from '../users/entities/user.entity/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Used by LocalStrategy to check credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password) {
      // Compare the given password with the stored hash
      const isMatch = await bcrypt.compare(pass, user.password);
      
      if (isMatch) {
        // Remove password before sending user object back
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result; 
      }
    }
    return null;
  }

  // Used by AuthController.login to generate the JWT token
  async login(user: User) {
    // Data to include inside the token (payload)
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    
    return {
      user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
      },
      accessToken: this.jwtService.sign(payload), // Generate the token
    };
  }
  
  // Used by AuthController.register
  async register(createUserDto: CreateUserDto) {
    const role = createUserDto.role || ('Cliente' as UserRole); 
    
    const user = await this.usersService.create({...createUserDto, role});
    
    // Log in the user immediately after successful registration
    return this.login(user);
  }
}