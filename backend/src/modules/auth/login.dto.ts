import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario',
    description: 'El nombre de usuario registrado',
  })
  nombre: string;

  @ApiProperty({
    example: 'clave',
    description: 'La contraseña en texto plano',
  })
  clave: string;
}
