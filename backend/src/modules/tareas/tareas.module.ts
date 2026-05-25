import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea]), ProyectosModule, AuthModule],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
