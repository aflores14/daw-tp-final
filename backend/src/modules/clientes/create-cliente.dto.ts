import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    example: 'Ministerio de Planificación',
    description: 'El nombre del cliente u organización',
  })
  nombre: string;
}
