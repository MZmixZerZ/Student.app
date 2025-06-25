import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AccessLogInterceptor } from './common/presentation/interceptors/access-log.interceptor';
import { AccessLogService } from './common/infrastructure/services/access-log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const accessLogService = app.get(AccessLogService);
  app.useGlobalInterceptors(new AccessLogInterceptor(accessLogService));

  // ตั้งค่า Global Prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // ตั้งค่า Validation Pipe แบบ global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('BE Service API')
    .setDescription('API documentation for the BE service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  // ตั้งค่า CORS ให้รองรับทั้ง local และ production
  const allowedOrigins = [
    'http://localhost:4200', // สำหรับ local dev
    'https://student-app-ss0i.onrender.com', // frontend production ล่าสุด
    'https://student-api-0gxf.onrender.com', // backend (ถ้าต้องการ)
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ฟังที่ port 3001 และ log URL ที่ใช้งาน webhook จริง
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`LINE Webhook endpoint: ${await app.getUrl()}/line/webhook`);
  console.log(`If you use globalPrefix, your webhook is: ${await app.getUrl()}/${globalPrefix}/line/webhook`);
}
bootstrap();
