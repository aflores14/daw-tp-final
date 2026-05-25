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
  exports: [ProyectosService], // Se exporta para permitir su uso en el módulo de tareas
})
export class ProyectosModule {}
