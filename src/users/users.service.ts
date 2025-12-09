
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Used by AuthService.register
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    // Password hashing happens automatically via hook in the entity
    return this.usersRepository.save(user);
  }

  // Used by AuthService.login
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  // Used by JwtStrategy validation
  async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Admin CRUD: Get all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ 
      select: ['id', 'name', 'email', 'role'] // Never return the password hash
    });
  }

  // Admin CRUD: Get one user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }
  
  // Admin CRUD: Delete user
  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }
}