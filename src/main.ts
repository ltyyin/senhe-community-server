import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

/**
 * 开启日志输入模式
 */
const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* 开启全局路由前缀 */
  app.setGlobalPrefix('api');

  // 开启全局验证pipe
  app.useGlobalPipes(new ValidationPipe());

  /**
   * 配置 swagger
   */
  const config = new DocumentBuilder()
    .setTitle('森和社区-API')
    .setDescription('基于NestJs-Prisma搭建的后台服务器')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * 开启服务的API端口
   */
  const PORT = process.env.SERVER_PORT;
  await app.listen(PORT);
  logger.log(`listen in http://localhost:${PORT}/api-docs`);
}
bootstrap();
