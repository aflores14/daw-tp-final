import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt'; // Importamos la librería de encriptación

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(nombre: string, clave: string) {
    // 1. Buscamos si existe el usuario en la base de datos
    const usuario = await this.usuariosService.buscarPorNombre(nombre);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 2. Comparamos la clave cruda con el Hash de la base de datos
    const isMatch = await bcrypt.compare(clave, usuario.clave);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 3. Si todo está bien, armamos el Payload (los datos que viajan dentro del token)
    const payload = { sub: usuario.id, nombre: usuario.nombre };

    // 4. Retornamos el token firmado
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
