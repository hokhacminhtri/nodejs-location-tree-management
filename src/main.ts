import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './common/logging/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw an error for unknown properties
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
  const logger = app.get(LoggerService); // Retrieve the LoggerService instance
  app.useGlobalFilters(new HttpExceptionFilter(logger)); // Register the exception filter

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Location Tree Management API')
    .setDescription('API documentation for managing hierarchical locations')
    .setVersion('1.0')
    .addTag('locations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
