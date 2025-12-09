
import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTicketDto {
  @ApiProperty({ description: 'UUID of the technician to assign the ticket to.' })
  @IsUUID()
  @IsNotEmpty()
  technicianId: string;
}