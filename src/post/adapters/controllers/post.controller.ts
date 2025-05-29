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
  Req,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { IPost } from 'src/post/domain/entities/post.entity';
import { CreatePostUseCase } from 'src/post/domain/use-cases/create-post';
import { GetAllPostsUseCase } from 'src/post/domain/use-cases/getAll-post';
import { FindByTitleOrContentUseCase } from 'src/post/domain/use-cases/getByTitleOrContent';
import { GetPostById } from 'src/post/domain/use-cases/getPostById';
import { EditPostUseCase } from 'src/post/domain/use-cases/edit-post';
import { DeletePost } from 'src/post/domain/use-cases/deletePost';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

type CreatePost = z.infer<typeof postSchema>;

@ApiTags('Posts')
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

  @ApiOperation({ summary: 'Retorna todos os posts' })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Professor, Role.Aluno)
  async getAll() {
    return await this.getAllPosts.getAll();
  }

  @ApiOperation({ summary: 'Retorna um post baseado no id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Professor, Role.Aluno)
  async getById(@Param('id') id: string): Promise<IPost | null> {
    return await this.findById.getById(id);
  }

  @ApiOperation({ summary: 'Realiza o cadastro de um post' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() { title, content, author }: CreatePost,
    @Req() req: any,
  ): Promise<IPost> {
    if (req.user.role !== Role.Professor) {
      throw new BadRequestException('Apenas professores podem criar posts');
    }

    return this.createPostUseCase.create({ title, content, author });
  }

  @ApiOperation({
    summary:
      'Busca no conteúdo ou título dos posts disponíveis o termo definido e retorna o post completo',
  })
  @Get('/search/:termo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Professor, Role.Aluno)
  async searchByTitleOrContent(
    @Param('termo') termo: string,
  ): Promise<IPost | null> {
    return await this.findByTitle.findByTitleOrContent(termo);
  }

  @ApiOperation({
    summary: 'Edita um post baseado no ID que é enviado na URL!',
  })
  @Put('/edit/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Professor)
  async updatePost(
    @Param('id') id: string,
    @Body() post: IPost,
  ): Promise<IPost | null> {
    return await this.editPost.edit(id, post);
  }

  @ApiOperation({ summary: 'Deleta um post a partir do ID informado' })
  @Delete('/delete/:id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Professor)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deletePost.delete(id);
  }
}
