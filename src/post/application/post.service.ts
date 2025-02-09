import { Injectable } from '@nestjs/common';
import { PostRepository } from '../domain/repositories/post.repository';
import { IPost } from '../domain/entities/post.entity';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getAll() {
    return this.postRepository.getAll();
  }

  async createPost(post: IPost): Promise<any> {
    return this.postRepository.create(post);
  }
}
