import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './adapters/controllers/post.controller';
import { PostService } from './adapters/services/post.service';
import { PostRepository } from './adapters/repositories/post.repository';
import { PostMongooseRepository } from './adapters/repositories/mongoose/post.mongoose.repository';
import { Post, PostSchema } from './entities/schemas/post.schema';
import { CreatePostUseCase } from './use-cases/create-post';
import { GetAllPostsUseCase } from './use-cases/getAll-post';
import { FindByTitleUseCase } from './use-cases/findByTitle';

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
    CreatePostUseCase,
    GetAllPostsUseCase,
    FindByTitleUseCase,
    PostService,
  ],
  exports: [CreatePostUseCase, GetAllPostsUseCase, FindByTitleUseCase],
})
export class PostModule {}
