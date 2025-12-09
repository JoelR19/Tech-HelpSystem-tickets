
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from  "../../../tickets/entities/ticket.entity/ticket.entity"

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; 

  @OneToMany(() => Ticket, ticket => ticket.category)
  tickets: Ticket[];
}