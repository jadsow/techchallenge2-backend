import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './infra/schemas/post.schema';
import { PostRepository } from './domain/repositories/post.repository';
import { PostMongooseRepository } from './domain/repositories/mongoose/post.mongoose.repository';
import { PostController } from './presentation/post.controller';
import { PostService } from './application/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: PostRepository,
      useClass: PostMongooseRepository,
    },
    PostService,
  ],
})
export class PostModule {}
