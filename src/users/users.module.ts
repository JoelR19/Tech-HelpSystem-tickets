// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity/user.entity'; 
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    // Register User entity with TypeORM
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // Export service and entity for AuthModule to use
  exports: [TypeOrmModule, UsersService], 
})
export class UsersModule {}