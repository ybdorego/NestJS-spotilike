import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  // app.enableCors();

  app.enableCors({
    origin: 'http://localhost:8000/', // or an array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable credentials (cookies, authorization headers)
  });


  await app.listen(3000);
}
bootstrap();
