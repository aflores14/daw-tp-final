import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProyectoDto } from './create-proyecto.dto';

@ApiTags('Proyectos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos' })
  async findAll() {
    return await this.proyectosService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto (interno o con cliente)' })
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    return await this.proyectosService.create(
      createProyectoDto.nombre,
      createProyectoDto.clienteId,
    );
  }
}