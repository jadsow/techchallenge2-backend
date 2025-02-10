import { ICreatePostUseCase } from './interfaces/create-post.interface';
import { IPost } from './../entities/post.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { PostRepository } from '../adapters/repositories/post.repository';

@Injectable()
export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async create(post: IPost): Promise<IPost> {
    const existingPost = await this.postRepository.findByTitle(post.title);

    if (existingPost) {
      throw new ConflictException('Post com este título já existe');
    }

    return this.postRepository.create(post);
  }
}
