import { ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoProyecto } from './proyecto.entity';

export class UpdateProyectoDto {
  @ApiPropertyOptional({ example: 'Nuevo nombre de proyecto' })
  nombre?: string;

  @ApiPropertyOptional({
    enum: EstadoProyecto,
    description: 'Estado del proyecto',
  })
  estado?: EstadoProyecto;
}
