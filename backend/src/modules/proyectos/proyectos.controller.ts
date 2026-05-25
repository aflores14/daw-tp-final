import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProyectoDto } from './create-proyecto.dto';
import { UpdateProyectoDto } from './update-proyecto.dto';

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
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    return await this.proyectosService.create(
      createProyectoDto.nombre,
      createProyectoDto.clienteId,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar nombre y/o estado de un proyecto' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProyectoDto,
  ) {
    return await this.proyectosService.update(id, updateDto);
  }

  @Put(':id/baja')
  @ApiOperation({ summary: 'Dar de baja a un proyecto' })
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return await this.proyectosService.softDelete(id);
  }
}
