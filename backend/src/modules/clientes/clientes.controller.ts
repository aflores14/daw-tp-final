import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateClienteDto } from './create-cliente.dto'; // 👈 Importamos el DTO

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
    // 👈 Usamos el DTO acá
    // Extraemos el nombre del DTO para mandarlo al servicio
    return await this.clientesService.create(createClienteDto.nombre);
  }

  @Put(':id/baja')
  @ApiOperation({ summary: 'Dar de baja a un cliente' })
  async softDelete(@Param('id') id: number) {
    return await this.clientesService.softDelete(id);
  }
}
