// src/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto'; // Importamos el DTO de Login

@ApiTags('Auth')
@Controller('auth') // Este define el prefijo /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // ... (código de registro)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login') // Este define la ruta /login
  @UseGuards(LocalAuthGuard) 
  @ApiOperation({ summary: 'Log in and get JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful. Returns JWT token.', type: Object })
  async login(@Body() loginDto: LoginDto, @Request() req) {
    // req.user es llenado por LocalAuthGuard/LocalStrategy
    return this.authService.login(req.user);
  }
}