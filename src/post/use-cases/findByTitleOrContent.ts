import { IPost } from '../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../adapters/repositories/post.repository';

@Injectable()
export class FindByTitleOrContentUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async findByTitleOrContent(termo: string): Promise<IPost | null> {
    return this.postRepository.findByTitleOrContent(termo);
  }
}
