import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IDeletePost } from './interfaces/delete-post.interface';

@Injectable()
export class DeletePost implements IDeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async delete(id: string): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    this.postRepository.deletePost(id);
  }
}
