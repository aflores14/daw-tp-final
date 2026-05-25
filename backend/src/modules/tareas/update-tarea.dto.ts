import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoTarea } from './tarea.entity';

export class UpdateTareaDto {
  @ApiPropertyOptional({ example: 'Login actualizado' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ enum: EstadoTarea })
  @IsOptional()
  @IsEnum(EstadoTarea)
  estado?: EstadoTarea;
}
