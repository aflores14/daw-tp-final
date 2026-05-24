import { ApiProperty } from '@nestjs/swagger';

export class CreateProyectoDto {
  @ApiProperty({ 
    example: 'Nuevo Sistema Web', 
    description: 'El nombre único del proyecto' 
  })
  nombre: string;

  @ApiProperty({ 
    example: 1, 
    description: 'ID del cliente asociado (Opcional para proyectos internos)', 
    required: false 
  })
  clienteId?: number;
}