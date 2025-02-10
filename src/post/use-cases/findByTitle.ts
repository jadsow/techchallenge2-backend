import { IPost } from './../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../adapters/repositories/post.repository';

@Injectable()
export class FindByTitleUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async findByTitle(title: string): Promise<IPost | null> {
    return this.postRepository.findByTitle(title);
  }
}
