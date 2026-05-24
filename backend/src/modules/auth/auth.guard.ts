import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Capturamos la petición HTTP que está intentando entrar
    const request = context.switchToHttp().getRequest();
    // 2. Extraemos el token usando la función de abajo
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se envió un token de seguridad');
    }

    try {
      // 3. Verificamos que el token sea válido y no haya expirado
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload; // Adjuntamos los datos del usuario a la petición
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return true; // Si todo está bien, dejamos pasar la petición
  }

  // Función privada que corta la palabra "Bearer" y se queda solo con el token
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
