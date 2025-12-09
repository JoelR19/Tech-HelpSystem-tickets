
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity/ticket.entity';
import { TicketStatus } from './enums/ticket-status.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(newTicket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
        relations: ['client', 'technician', 'category'],
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
        where: { id },
        relations: ['client', 'technician', 'category'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found.`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found.`);
    }

    Object.assign(ticket, updateTicketDto);
    return this.ticketsRepository.save(ticket);
  }
  
  async assignTechnician(id: string, technicianId: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found.`);
    }
    if (ticket.status === TicketStatus.CLOSED || ticket.status === TicketStatus.RESOLVED) {
        throw new BadRequestException('Cannot assign a technician to a closed or resolved ticket.');
    }

    ticket.technicianId = technicianId;
    ticket.status = TicketStatus.IN_PROGRESS; 
    
    return this.ticketsRepository.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const result = await this.ticketsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID "${id}" not found.`);
    }
  }
}