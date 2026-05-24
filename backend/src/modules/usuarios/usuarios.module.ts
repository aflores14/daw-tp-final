import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  exports: [UsuariosService] // Fundamental: Lo exportamos para que el Login lo pueda usar
})
export class UsuariosModule {}