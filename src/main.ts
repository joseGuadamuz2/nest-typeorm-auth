import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitamos CORS para permitir peticiones desde tu Frontend en React
  app.enableCors({
    origin: 'http://localhost:5173', // El puerto de tu Vite
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Configuración global de validaciones de DTOs (si ya la tenías)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
  console.log('Servidor NestJS corriendo en el puerto 3000 con CORS habilitado 🚀');
}
bootstrap();
