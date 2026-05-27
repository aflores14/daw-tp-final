import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';
import { Tarea } from '../tareas/tarea.entity';
import { DashboardStatsDto } from './dtos/output/dashboard-stats.dto';

// Interfaces explícitas para cada tipo de respuesta de la base de datos
interface RawStat {
  estado: string;
  cantidad: string | number;
}
interface RawClienteStat {
  cliente: string;
  total: string | number;
}
interface RawEficiencia {
  nombre: string;
  porcentaje: string | number;
}

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
    @InjectRepository(Tarea)
    private readonly tareaRepo: Repository<Tarea>,
  ) {}

  async getGeneralStats(): Promise<DashboardStatsDto> {
    const totalProyectos = await this.proyectoRepo.count();

    const [porEstado, tareasEstado, porCliente, eficiencia] = await Promise.all(
      [
        this.proyectoRepo
          .createQueryBuilder('p')
          .select('p.estado', 'estado')
          .addSelect('COUNT(p.id)', 'cantidad')
          .groupBy('p.estado')
          .getRawMany<RawStat>(),
        this.tareaRepo
          .createQueryBuilder('t')
          .select('t.estado', 'estado')
          .addSelect('COUNT(t.id)', 'cantidad')
          .groupBy('t.estado')
          .getRawMany<RawStat>(),
        this.proyectoRepo
          .createQueryBuilder('p')
          .leftJoin('p.cliente', 'c')
          .select('c.nombre', 'cliente')
          .addSelect('COUNT(p.id)', 'total')
          .groupBy('c.nombre')
          .getRawMany<RawClienteStat>(),
        this.proyectoRepo
          .createQueryBuilder('p')
          .leftJoin('p.tareas', 't')
          .select('p.nombre', 'nombre')
          .addSelect(
            "SUM(CASE WHEN t.estado = 'FINALIZADA' THEN 1 ELSE 0 END)::float / NULLIF(COUNT(t.id), 0) * 100",
            'porcentaje',
          )
          .groupBy('p.id')
          .getRawMany<RawEficiencia>(),
      ],
    );

    // Mapeo seguro con tipado explícito
    return {
      totalProyectos,
      proyectosPorEstado: porEstado.map((i: RawStat) => ({
        estado: i.estado,
        cantidad: Number(i.cantidad),
      })),
      tareasPorEstado: tareasEstado.map((i: RawStat) => ({
        estado: i.estado,
        cantidad: Number(i.cantidad),
      })),
      proyectosPorCliente: porCliente.map((i: RawClienteStat) => ({
        cliente: i.cliente || 'Sin Cliente',
        total: Number(i.total),
      })),
      eficienciaProyectos: eficiencia.map((i: RawEficiencia) => ({
        nombre: i.nombre,
        porcentajeFinalizacion: Number(i.porcentaje || 0),
      })),
    };
  }
}
