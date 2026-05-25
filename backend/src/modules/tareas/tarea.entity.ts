import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';

export enum EstadoTarea {
  PENDIENTE = 'PENDIENTE',
  FINALIZADA = 'FINALIZADA',
  BAJA = 'BAJA',
}

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: EstadoTarea,
    enumName: 'estados_tareas',
    default: EstadoTarea.PENDIENTE,
  })
  estado!: EstadoTarea;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto!: Proyecto;
}
