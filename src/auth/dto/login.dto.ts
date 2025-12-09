// src/auth/dto/login.dto.ts

import { PickType } from '@nestjs/swagger';
// Asegúrate que esta ruta a CreateUserDto es correcta
import { CreateUserDto } from '../../users/dto/create-user.dto/create-user.dto';

// Usamos PickType para tomar solo email y password del DTO de creación de usuario
export class LoginDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}