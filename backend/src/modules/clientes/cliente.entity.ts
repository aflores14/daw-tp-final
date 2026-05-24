import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum EstadoCliente {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @Column({
    type: 'enum',
    enum: EstadoCliente,
    default: EstadoCliente.ACTIVO
  })
  estado: EstadoCliente;

  @OneToMany('Proyecto', 'cliente')
  proyectos: any[];
}