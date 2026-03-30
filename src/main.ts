import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fortisight VMS API')
    .setDescription('The Master Control API for the Python AI Engine orchestrations')
    .setVersion('1.0')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // Enable CORS so your React standard Dashboards can easily fetch the Swagger JSON and APIs
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
