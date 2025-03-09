import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './adapters/controllers/post.controller';

import { PostRepository } from './domain/repositories/post.repository';
import { PostMongooseRepository } from './infra/repositories/mongoose/post.mongoose.repository';
import { Post, PostSchema } from './infra/schemas/post.schema';
import { CreatePostUseCase } from './domain/use-cases/create-post';
import { GetAllPostsUseCase } from './domain/use-cases/getAll-post';
import { FindByTitleOrContentUseCase } from './domain/use-cases/getByTitleOrContent';
import { GetPostById } from './domain/use-cases/getPostById';
import { EditPostUseCase } from './domain/use-cases/edit-post';
import { DeletePost } from './domain/use-cases/deletePost';

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
    FindByTitleOrContentUseCase,
    GetPostById,
    EditPostUseCase,
    DeletePost,
  ],
  exports: [
    CreatePostUseCase,
    GetAllPostsUseCase,
    FindByTitleOrContentUseCase,
    GetPostById,
    DeletePost,
    EditPostUseCase,
  ],
})
export class PostModule {}
