import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, EstadoUsuario } from './usuario.entity'; // Importamos el Enum

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Renombramos a "buscarPorNombre" para que Auth no se rompa, y permitimos null
  async buscarPorNombre(nombre: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { nombre } });
  }

  async create(nombre: string, clave: string): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      clave,
      estado: EstadoUsuario.ACTIVO, // Usamos el Enum exacto en lugar de texto
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }
}
