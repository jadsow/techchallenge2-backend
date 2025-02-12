import { CreatePostUseCase } from './../../use-cases/create-post';
import {
  BadRequestException,
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
import { FindByTitleOrContentUseCase } from 'src/post/use-cases/getByTitleOrContent';
import { GetPostById } from 'src/post/use-cases/getPostById';

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
    private readonly findByTitle: FindByTitleOrContentUseCase,
    private readonly findById: GetPostById,
  ) {}

  @Get()
  async getAll() {
    return await this.getAllPosts.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IPost | null> {
    try {
      const post = await this.findById.getById(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() { title, content, author }: CreatePost): Promise<IPost> {
    try {
      return await this.createPostUseCase.create({ title, content, author });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw error;
    }
  }

  @Get('/search/:termo')
  async searchByTitleOrContent(
    @Param('termo') termo: string,
  ): Promise<IPost | null> {
    try {
      const post = await this.findByTitle.findByTitleOrContent(termo);
      return post;
    } catch (error) {
      throw new NotFoundException('Post com esse título não encontrado');
    }
  }
}
