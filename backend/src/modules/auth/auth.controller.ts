import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './login.dto'; // Importamos el molde que creaste

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión para obtener el Token JWT' })
  async login(@Body() loginDto: LoginDto) {
    // Extraemos el nombre y la clave del DTO y se los pasamos al servicio
    return await this.authService.login(loginDto.nombre, loginDto.clave);
  }
}