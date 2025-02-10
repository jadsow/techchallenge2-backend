import { IPost } from './../entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../adapters/repositories/post.repository';
import { IGetAllPostsUseCase } from './interfaces/getAll-post.interface';

@Injectable()
export class GetAllPostsUseCase implements IGetAllPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async getAll(): Promise<IPost[]> {
    return this.postRepository.getAll();
  }
}
