import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto, EstadoProyecto } from './proyecto.entity';
import { Cliente, EstadoCliente } from '../clientes/cliente.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({ relations: { cliente: true } });
  }

  async create(nombre: string, clienteId?: number): Promise<Proyecto> {
    // Control absoluto del estado desde el backend para evitar fallos de restricciones NOT NULL
    const nuevoProyecto = this.proyectoRepository.create({
      nombre,
      estado: EstadoProyecto.ACTIVO,
    });

    if (clienteId) {
      const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });

      if (!cliente) {
        throw new NotFoundException('El cliente especificado no existe');
      }
      if (cliente.estado !== EstadoCliente.ACTIVO) {
        throw new BadRequestException('Solo se pueden asignar proyectos a clientes en estado ACTIVO');
      }
      nuevoProyecto.cliente = cliente;
    }

    return await this.proyectoRepository.save(nuevoProyecto);
  }
}