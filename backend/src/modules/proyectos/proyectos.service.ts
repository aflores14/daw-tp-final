import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto, EstadoProyecto } from './proyecto.entity';
import { Cliente, EstadoCliente } from '../clientes/cliente.entity';
import { UpdateProyectoDto } from './update-proyecto.dto';

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
    const nuevoProyecto = this.proyectoRepository.create({
      nombre,
      estado: EstadoProyecto.ACTIVO,
    });

    if (clienteId) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: clienteId },
      });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      nuevoProyecto.cliente = cliente;
    }
    return await this.proyectoRepository.save(nuevoProyecto);
  }

  async update(id: number, updateDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    if (updateDto.nombre) proyecto.nombre = updateDto.nombre;
    if (updateDto.estado) proyecto.estado = updateDto.estado;

    return await this.proyectoRepository.save(proyecto);
  }

  async softDelete(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    proyecto.estado = EstadoProyecto.BAJA;
    return await this.proyectoRepository.save(proyecto);
  }
}
