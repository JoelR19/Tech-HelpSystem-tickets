
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto'; 


@ApiTags('Tickets')
@Controller('tickets') // Prefijo: /api/tickets
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // POST /api/tickets
  @Post()
  @ApiOperation({ summary: 'Create a new support ticket' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ticket successfully created.' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  // GET /api/tickets
  @Get()
  @ApiOperation({ summary: 'Get list of all tickets with details' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  // GET /api/tickets/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket data.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Ticket not found.' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  // PATCH /api/tickets/:id (Actualizar título/descripción/estado)
  @Patch(':id')
  @ApiOperation({ summary: 'Update ticket details or status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket successfully updated.' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  // PATCH /api/tickets/:id/assign (Asignar técnico, cambia estado a En Progreso)
  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign a technician to the ticket' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ticket successfully assigned.' })
  assign(@Param('id') id: string, @Body() assignTicketDto: AssignTicketDto) {
    return this.ticketsService.assignTechnician(id, assignTicketDto.technicianId);
  }

  // DELETE /api/tickets/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete ticket by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Ticket deleted.' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}