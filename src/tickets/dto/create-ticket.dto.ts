
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: 'Title of the support ticket.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Detailed description of the issue.' })
  @IsString()
  @IsNotEmpty()
  description: string;
  
  // ID de la Categoría (Hardware, Software, Solicitud)
  @ApiProperty({ description: 'UUID of the related category.' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  // ID del Cliente (Normalmente se obtiene del JWT)
  @ApiProperty({ description: 'UUID of the client creating the ticket.' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string; 
}