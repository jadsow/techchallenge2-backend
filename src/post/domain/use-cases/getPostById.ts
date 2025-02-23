import { IGetById } from './interfaces/getById-post.interface';
import { IPost } from '../entities/post.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class GetPostById implements IGetById {
  constructor(private readonly postRepository: PostRepository) {}

  async getById(id: string): Promise<IPost | null> {
    try {
      const post = await this.postRepository.getById(id);
      if (!post) {
        throw new NotFoundException('Post não encontrado');
      }
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('Erro ao buscar o post');
    }
  }
}
