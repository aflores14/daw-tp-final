import { ApiProperty } from '@nestjs/swagger';

export class StatItemDto {
  @ApiProperty({ example: 'ACTIVO' }) estado!: string;
  @ApiProperty({ example: 5 }) cantidad!: number;
}

export class ClienteStatDto {
  @ApiProperty({ example: 'Empresa X' }) cliente!: string;
  @ApiProperty({ example: 3 }) total!: number;
}

export class ProyectoEficienciaDto {
  @ApiProperty({ example: 'Proyecto Web' }) nombre!: string;
  @ApiProperty({ example: 85.5 }) porcentajeFinalizacion!: number;
}

export class DashboardStatsDto {
  @ApiProperty({ example: 10 }) totalProyectos!: number;
  @ApiProperty({ type: [StatItemDto] }) proyectosPorEstado!: StatItemDto[];
  @ApiProperty({ type: [StatItemDto] }) tareasPorEstado!: StatItemDto[];
  @ApiProperty({ type: [ClienteStatDto] })
  proyectosPorCliente!: ClienteStatDto[];
  @ApiProperty({ type: [ProyectoEficienciaDto] })
  eficienciaProyectos!: ProyectoEficienciaDto[];
}
