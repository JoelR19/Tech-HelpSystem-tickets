// src/users/users.controller.ts (CORREGIDO)

import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

// 1. CORRECCIÓN DE RUTAS DE DTO Y ENTIDAD (Simplificadas)
// Se asume la estructura estándar de NestJS:
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UserRole } from './entities/user.entity/user.entity';     

// 2. CORRECCIÓN DE RUTAS DE GUARDS Y DECORATOR (Simplificadas)
// Se asume que estos archivos están directamente dentro de sus carpetas respectivas:
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator/roles.decorator';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users (Admin Only)')
@Controller('users')
// Apply Auth and Roles Guards to the entire controller
@UseGuards(JwtAuthGuard, RolesGuard)
// 3. USO DEL ROL: Asumimos que el valor 'Administrador' está asociado a UserRole.ADMIN
@Roles(UserRole.ADMIN) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users: Create a new user (Accessible only by Admin)
  @Post()
  @ApiOperation({ summary: 'Admin: Create a new user with any role' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failed.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET /users: List all users
  @Get()
  @ApiOperation({ summary: 'Admin: Get list of all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of users.' })
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/:id: Get a user by ID
  @Get(':id')
  @ApiOperation({ summary: 'Admin: Get user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User data.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // DELETE /users/:id: Delete a user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: Delete user by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}