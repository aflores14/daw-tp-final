import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './create-tarea.dto';
import { UpdateTareaDto } from './update-tarea.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Tareas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tareas')
export class TareasController {
  constructor(private readonly srv: TareasService) {}

  @Get() @ApiOperation({ summary: 'Listar tareas' }) findAll() {
    return this.srv.findAll();
  }
  @Post() @ApiOperation({ summary: 'Crear tarea' }) create(
    @Body() dto: CreateTareaDto,
  ) {
    return this.srv.create(dto);
  }
  @Put(':id') @ApiOperation({ summary: 'Actualizar tarea' }) update(
    @Param('id') id: string,
    @Body() dto: UpdateTareaDto,
  ) {
    return this.srv.update(+id, dto);
  }
  @Delete(':id') @ApiOperation({ summary: 'Eliminar tarea' }) remove(
    @Param('id') id: string,
  ) {
    return this.srv.remove(+id);
  }
}
