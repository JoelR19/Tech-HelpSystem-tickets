
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
      ignoreExpiration: false, 
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneById(payload.sub); 
    if (!user) {
        return false; // User not found
    }
    
    // Return user information to be attached to the request (req.user)
    return { 
        id: payload.sub, 
        email: payload.email, 
        role: payload.role 
    }; 
  }
}