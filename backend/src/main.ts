import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error if a property is not in the DTO
    transform: true, // Automatically transform payloads to DTOs (e.g., strings to numbers)
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
