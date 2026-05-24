import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Permite que el frontend (Angular en puerto 4200) haga peticiones sin ser bloqueado
  app.enableCors();

  // 2. Agrega el prefijo '/api' a todas las rutas (ej: localhost:3000/api/clientes)
  app.setGlobalPrefix('api');

  // 3. Configuración de Swagger para documentar y probar los endpoints
  const config = new DocumentBuilder()
    .setTitle('Gestor de Proyectos API')
    .setDescription('Backend para el TFI de Desarrollo de Aplicaciones Web')
    .setVersion('1.0')
    .addBearerAuth() // Activa el candado para enviar el token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. Inicia el servidor usando el puerto del .env o el 3000 por defecto
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `🚀 Servidor listo y conectado a la BD en: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
