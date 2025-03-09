import { CreatePostUseCase } from './../../domain/use-cases/create-post';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { z } from 'zod';
import { IPost } from 'src/post/domain/entities/post.entity';
import { GetAllPostsUseCase } from 'src/post/domain/use-cases/getAll-post';
import { FindByTitleOrContentUseCase } from 'src/post/domain/use-cases/getByTitleOrContent';
import { GetPostById } from 'src/post/domain/use-cases/getPostById';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EditPostUseCase } from 'src/post/domain/use-cases/edit-post';
import { DeletePost } from 'src/post/domain/use-cases/deletePost';

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
    private readonly editPost: EditPostUseCase,
    private readonly deletePost: DeletePost,
  ) {}

  @ApiOperation({
    summary: 'Retorna todos os posts',
  })
  @Get()
  async getAll() {
    return await this.getAllPosts.getAll();
  }

  @ApiOperation({
    summary: 'Retorna um post baseado no id',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<IPost | null> {
    const post = await this.findById.getById(id);
    return post;
  }

  @ApiOperation({
    summary: 'Realiza o cadastro de um post',
  })
  @Post()
  async create(@Body() { title, content, author }: CreatePost): Promise<IPost> {
    return this.createPostUseCase.create({ title, content, author });
  }

  @ApiOperation({
    summary:
      'Busca no conteúdo ou título dos posts disponíveis o termo definido e retorna o posts completos',
  })
  @Get('/search/:termo')
  async searchByTitleOrContent(
    @Param('termo') termo: string,
  ): Promise<IPost | null> {
    const post = await this.findByTitle.findByTitleOrContent(termo);
    return post;
  }

  @ApiOperation({
    summary: 'Edita um post baseado no ID que é enviado na URL!',
  })
  @Put('/edit/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() post: IPost,
  ): Promise<IPost | null> {
    const updatedPost = await this.editPost.edit(id, post);
    return updatedPost;
  }

  @ApiOperation({
    summary: 'Deleta um post a partir do ID informado',
  })
  @Delete('/delete/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const updatedPost = await this.deletePost.delete(id);
    return updatedPost;
  }
}
