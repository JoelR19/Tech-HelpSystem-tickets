
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Importamos el DTO de Login
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard) 
  @ApiOperation({ summary: 'Log in and get JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful. Returns JWT token.', type: Object })
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}