import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Este método lo va a usar el módulo de Auth para validar el login
  async buscarPorNombre(nombre: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { nombre } });
  }
}