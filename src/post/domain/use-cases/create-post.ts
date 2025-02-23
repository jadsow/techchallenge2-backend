import { ICreatePostUseCase } from './interfaces/create-post.interface';
import { IPost } from './../entities/post.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async create(post: IPost): Promise<IPost> {
    const existingPost = await this.postRepository.findByTitleOrContent(
      post.title,
    );

    if (existingPost) {
      throw new BadRequestException('Post com este título já existe');
    }

    return this.postRepository.create(post);
  }
}
