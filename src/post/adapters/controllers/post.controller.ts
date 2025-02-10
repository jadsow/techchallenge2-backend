import { CreatePostUseCase } from './../../use-cases/create-post';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { IPost } from 'src/post/entities/post.entity';
import { GetAllPostsUseCase } from 'src/post/use-cases/getAll-post';
import { FindByTitleUseCase } from 'src/post/use-cases/findByTitle';

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
    private readonly findByTitle: FindByTitleUseCase,
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
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }

  @Get(':title')
  async searchByTitle(@Param('title') title: string): Promise<IPost> {
    const post = await this.findByTitle.findByTitle(title);
    if (!post) {
      throw new NotFoundException('Post com esse título não encontrado');
    }
    return post;
  }
}
