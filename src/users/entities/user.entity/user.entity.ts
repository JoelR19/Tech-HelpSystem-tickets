
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Ticket } from '../../../tickets/entities/ticket.entity/ticket.entity'; 

// Role definition
export enum UserRole {
  ADMIN = 'Administrador',
  TECHNICIAN = 'Técnico',
  CLIENT = 'Cliente',
}


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @OneToMany(() => Ticket, ticket => ticket.client)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.technician)
  assignedTickets: Ticket[];

  // Hash password before save
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Check password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}