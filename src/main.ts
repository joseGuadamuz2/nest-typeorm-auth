import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Filtra propiedades fuera del DTO
      forbidNonWhitelisted: true, // Bloquea solicitudes maliciosas o corruptas
    }),
  );

  await app.listen(3000);
  console.log('API desplegada de manera local en el puerto: 3000');
}
bootstrap();
