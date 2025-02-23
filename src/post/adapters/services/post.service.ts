import { PostRepository } from '../../domain/repositories/post.repository';
import { IPost } from './../../domain/entities/post.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  // async getAll() {
  //   return this.postRepository.getAll();
  // }

  // async createPost(post: IPost): Promise<any> {
  //   const existingPost = await this.postRepository.findByTitle(post.title);

  //   if (existingPost) {
  //     throw new Error('Já existe um post com este título');
  //   }

  //   return this.postRepository.create(post);
  // }
}
