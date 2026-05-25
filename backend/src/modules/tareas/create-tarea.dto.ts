import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTareaDto {
  @ApiProperty({
    example: 'Implementar login',
    description: 'Descripción de la tarea',
  })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsNumber()
  @IsNotEmpty()
  proyectoId!: number;
}
