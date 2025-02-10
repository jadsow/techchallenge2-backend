import { PostService } from './adapters/services/post.service';
import { PostMongooseRepository } from './adapters/repositories/mongoose/post.mongoose.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './adapters/controllers/post.controller';
import { PostRepository } from './adapters/repositories/post.repository';
import { Post, PostSchema } from './entities/schemas/post.schema';

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
