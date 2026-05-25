import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet'; // 👈 1. Instalar con: npm i helmet
import { ValidationPipe } from '@nestjs/common'; // 👈 2. Importar

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad básica contra ataques web
  app.use(helmet());

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // Error si envían campos basura
      transform: true, // Transforma tipos automáticamente (muy útil)
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Gestor de Proyectos API')
    .setDescription('Backend para el TFI de Desarrollo de Aplicaciones Web')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor listo en: http://localhost:${port}/api/docs`);
}
bootstrap().catch((err) => console.error(err));
