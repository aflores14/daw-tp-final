import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './proyecto.entity';
import { Cliente } from '../clientes/cliente.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Cliente]), AuthModule],
  providers: [ProyectosService],
  controllers: [ProyectosController],
  exports: [ProyectosService, TypeOrmModule], // 👈 Esto permite inyectar ProyectoRepository en TareasService
})
export class ProyectosModule {}
