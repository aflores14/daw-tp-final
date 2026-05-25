import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente, EstadoCliente } from './cliente.entity';
import { UpdateClienteDto } from './update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: { proyectos: true },
    });
  }

  async create(nombre: string): Promise<Cliente> {
    const nuevoCliente = this.clienteRepository.create({
      nombre,
      estado: EstadoCliente.ACTIVO,
    });
    return await this.clienteRepository.save(nuevoCliente);
  }

  async update(id: number, updateDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    // Actualizamos solo si los campos existen en el DTO
    if (updateDto.nombre) cliente.nombre = updateDto.nombre;
    if (updateDto.estado) cliente.estado = updateDto.estado;

    return await this.clienteRepository.save(cliente);
  }

  async softDelete(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: { proyectos: true },
    });

    if (!cliente) throw new NotFoundException(`Cliente no encontrado`);

    const tieneProyectosActivos =
      cliente.proyectos && cliente.proyectos.some((p) => p.estado !== 'BAJA');

    if (tieneProyectosActivos) {
      throw new BadRequestException(
        'No se puede dar de baja: tiene proyectos asociados.',
      );
    }

    cliente.estado = EstadoCliente.BAJA;
    return await this.clienteRepository.save(cliente);
  }
}
