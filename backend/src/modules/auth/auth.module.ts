import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    UsuariosModule, // Importamos el módulo de usuarios para poder buscarlos
    // Configuración asíncrona del JWT leyendo el .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2h' }, // El token durará 2 horas
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtModule], // Exportamos el Guard para que Clientes y Proyectos lo puedan usar
})
export class AuthModule {}
