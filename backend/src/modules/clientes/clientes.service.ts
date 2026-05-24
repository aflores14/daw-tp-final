import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente, EstadoCliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    // Corrección: Usamos un objeto { proyectos: true } en lugar del arreglo
    return await this.clienteRepository.find({ relations: { proyectos: true } });
  }

  async create(nombre: string): Promise<Cliente> {
    const nuevoCliente = this.clienteRepository.create({ nombre });
    return await this.clienteRepository.save(nuevoCliente);
  }

  async softDelete(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      // Corrección: Usamos el objeto relacional acá también
      relations: { proyectos: true },
    });

    if (!cliente) throw new NotFoundException(`Cliente no encontrado`);

    const tieneProyectosActivos = cliente.proyectos && cliente.proyectos.some(p => p.estado !== 'BAJA');
    if (tieneProyectosActivos) {
      throw new BadRequestException('No se puede dar de baja: tiene proyectos asociados.');
    }

    cliente.estado = EstadoCliente.BAJA;
    return await this.clienteRepository.save(cliente);
  }
}