
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity';
import { Category } from '../../../categories/entities/category.entity/category.entity';
import { TicketStatus } from '../../enums/ticket-status.enum';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @ManyToOne(() => Category, category => category.tickets)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => User, user => user.createdTickets)
  @JoinColumn({ name: 'clientId' })
  client: User;

  @Column({ type: 'uuid' })
  clientId: string;

  @ManyToOne(() => User, user => user.assignedTickets, { nullable: true })
  @JoinColumn({ name: 'technicianId' })
  technician: User;

  @Column({ type: 'uuid', nullable: true })
  technicianId: string | null;
}