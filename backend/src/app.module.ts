import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importamos los tres módulos que construimos
import { ClientesModule } from './modules/clientes/clientes.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 1. Configuración de variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // 2. Conexión central asíncrona a PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, // Registra automáticamente cliente.entity.ts y usuario.entity.ts
        synchronize: false,     // Mantenemos en false por el script SQL manual
        logging: configService.get<string>('DB_LOGGING') === 'true',
      }),
    }),

    // 3. Registro de módulos para que NestJS active sus controladores y servicios
    UsuariosModule,
    AuthModule,
    ClientesModule, // 👈 Aseguramos que Clientes esté aquí adentro
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}