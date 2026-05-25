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
import { ClientesService } from './clientes.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateClienteDto } from './create-cliente.dto';
import { UpdateClienteDto } from './update-cliente.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clientesService.create(createClienteDto.nombre);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar nombre y/o estado de un cliente' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateClienteDto,
  ) {
    return await this.clientesService.update(id, updateDto);
  }

  @Put(':id/baja')
  @ApiOperation({ summary: 'Dar de baja a un cliente' })
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return await this.clientesService.softDelete(id);
  }
}
