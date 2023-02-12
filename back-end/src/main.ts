import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
=======
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
>>>>>>> 8c3a22ebf95d4e1b0cacfa56421cca287dae2cd7
  await app.listen(3000);
}
bootstrap();
