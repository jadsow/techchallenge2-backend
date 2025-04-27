import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupRedoc } from './post/adapters/middlewares/redoc-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type, Authorization', 
  });


  const config = new DocumentBuilder()
    .setTitle('techchallenge-2')
    .setDescription('Endpoints do techchallenge 2')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  setupRedoc(app);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
