import { ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoCliente } from './cliente.entity';

export class UpdateClienteDto {
  @ApiPropertyOptional({
    example: 'Nuevo Nombre',
    description: 'Nombre del cliente',
  })
  nombre?: string;

  @ApiPropertyOptional({
    enum: EstadoCliente,
    description: 'Estado del cliente',
  })
  estado?: EstadoCliente;
}
