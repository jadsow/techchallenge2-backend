import { CreatePostUseCase } from './../../use-cases/create-post';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { z } from 'zod';
import { IPost } from 'src/post/entities/post.entity';
import { GetAllPostsUseCase } from 'src/post/use-cases/getAll-post';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

type CreatePost = z.infer<typeof postSchema>;

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPosts: GetAllPostsUseCase,
  ) {}

  @Get()
  async getAll() {
    return await this.getAllPosts.getAll();
  }

  @Post()
  async create(@Body() { title, content, author }: CreatePost): Promise<IPost> {
    try {
      return await this.createPostUseCase.create({ title, content, author });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
