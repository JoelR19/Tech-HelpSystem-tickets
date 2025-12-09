
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({ 
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { 
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