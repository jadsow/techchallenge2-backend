import { IPost } from '../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IGetByTitleOrContent } from './interfaces/getByTitleOrContent-interface';

@Injectable()
export class FindByTitleOrContentUseCase implements IGetByTitleOrContent {
  constructor(private readonly postRepository: PostRepository) {}

  async findByTitleOrContent(termo: string): Promise<IPost | null> {
    return this.postRepository.findByTitleOrContent(termo);
  }
}
