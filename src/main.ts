import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw an error for unknown properties
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); // Register the exception filter
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
