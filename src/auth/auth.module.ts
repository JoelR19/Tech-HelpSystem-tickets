// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; // Importar JwtModuleOptions
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy'; 

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    // Configuración Asíncrona del JWT con corrección de tipos
    JwtModule.registerAsync({
        imports: [ConfigModule],
        // Usamos JwtModuleOptions para tipar explícitamente el retorno:
        useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({ 
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { 
                // Aseguramos que el valor es el tipo esperado por jsonwebtoken
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') as any || '3600s',            },
        }),
        inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  // Provide the service and strategies
  providers: [AuthService, LocalStrategy, JwtStrategy], 
})
export class AuthModule {}