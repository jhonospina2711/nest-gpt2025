import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   // Deshabilitar la verificación de certificados SSL  
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
