import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea, EstadoTarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyecto.entity';
import { CreateTareaDto } from './create-tarea.dto';
import { UpdateTareaDto } from './update-tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea) private readonly tareaRepo: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  async create(dto: CreateTareaDto): Promise<Tarea> {
    // 1. Buscamos el proyecto
    const proyecto = await this.proyectoRepo.findOne({
      where: { id: dto.proyectoId },
    });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    // 2. Validación de negocio: No permitir tareas en proyectos de BAJA
    // Asegúrate de que 'BAJA' coincida con el valor en tu Enum de EstadoProyecto
    if (proyecto.estado === 'BAJA') {
      throw new BadRequestException(
        'No se pueden crear tareas en un proyecto dado de baja',
      );
    }

    // 3. Instanciamos la tarea base
    const nuevaTarea = this.tareaRepo.create({
      descripcion: dto.descripcion,
      estado: EstadoTarea.PENDIENTE,
      proyecto, // Asignamos el proyecto validado
    });

    // 4. Guardamos
    return await this.tareaRepo.save(nuevaTarea);
  }

  async findAll(): Promise<Tarea[]> {
    return await this.tareaRepo.find({ relations: { proyecto: true } });
  }

  async update(id: number, dto: UpdateTareaDto): Promise<Tarea> {
    const tarea = await this.tareaRepo.findOneBy({ id });
    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    Object.assign(tarea, dto);
    return await this.tareaRepo.save(tarea);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tareaRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Tarea no encontrada');
  }
}
