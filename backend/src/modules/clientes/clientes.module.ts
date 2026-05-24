import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente.entity';
import { AuthModule } from '../auth/auth.module'; // 👈 1. Importamos el módulo de Auth

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    AuthModule, // 👈 2. Lo agregamos a los imports de esta "caja"
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
