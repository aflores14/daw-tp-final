import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany, // 1. Importa OneToMany
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Tarea } from '../tareas/tarea.entity'; // 2. Importa la entidad Tarea

export enum EstadoProyecto {
  ACTIVO = 'ACTIVO',
  FINALIZADO = 'FINALIZADO',
  BAJA = 'BAJA',
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', unique: true })
  nombre!: string;

  @Column({
    type: 'enum',
    enum: EstadoProyecto,
  })
  estado!: EstadoProyecto;

  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente | null;

  // 3. Agrega la relación inversa
  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas!: Tarea[];
}
