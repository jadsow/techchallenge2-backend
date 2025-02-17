import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../adapters/repositories/post.repository';
import { IEditInterface } from './interfaces/edit-post.interface';
import { IPost } from '../entities/post.entity';

@Injectable()
export class EditPostUseCase implements IEditInterface {
  constructor(private readonly postRepository: PostRepository) {}

  async edit(id: string, post: IPost): Promise<IPost | null> {
    const existingPost = await this.postRepository.getById(id);

    if (!existingPost) {
      throw new NotFoundException(`Post com o id ${id} não encontrado`);
    }

    return this.postRepository.editPost(id, post);
  }
}
