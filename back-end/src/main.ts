import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/erros/interceptor/conflictError.intercepto';
import { NotFoundInterceptor } from './common/erros/interceptor/notFoundError.interceptor';
import { DatabaseInterceptor } from './common/erros/interceptor/databaseError.interceptor';
import { UnautorizedInterceptor } from './common/erros/interceptor/unautorizedError.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Simple API')
  .setDescription('The simple API')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  //app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ConflictInterceptor)
  app.useGlobalInterceptors(new DatabaseInterceptor)
  app.useGlobalInterceptors(new UnautorizedInterceptor)
  app.useGlobalInterceptors(new NotFoundInterceptor)
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
