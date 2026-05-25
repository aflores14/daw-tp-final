import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { EstadoCliente } from './cliente.entity';

export class UpdateClienteDto {
  @ApiPropertyOptional({ example: 'Nombre Modificado' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ enum: EstadoCliente })
  @IsOptional()
  @IsEnum(EstadoCliente)
  estado?: EstadoCliente;
}
