import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { ResponseTimeMiddleware } from './post/adapters/middlewares/tempo-resposta.middleware';
import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    PostModule,
    AlunoModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
