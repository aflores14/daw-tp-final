import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({ example: 'Nuevo Proyecto' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiPropertyOptional({ example: 1, description: 'ID del cliente opcional' })
  @IsOptional()
  @IsNumber()
  clienteId?: number;
}
