import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Nuevo Cliente', description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}
