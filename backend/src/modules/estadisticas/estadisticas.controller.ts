import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardStatsDto } from './dtos/output/dashboard-stats.dto';

@ApiTags('Estadísticas') // Esto agrupa el módulo en Swagger
@ApiBearerAuth() // Esto habilita el candado para poner el JWT
@UseGuards(AuthGuard) // Protegemos la ruta
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly srv: EstadisticasService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtener métricas generales del sistema' })
  @ApiOkResponse({
    description: 'Métricas de proyectos y tareas obtenidas exitosamente',
    type: DashboardStatsDto,
  })
  async getDashboard(): Promise<DashboardStatsDto> {
    return await this.srv.getGeneralStats();
  }
}
