import { IPost } from './../../entities/post.entity';

export abstract class PostRepository {
  abstract getAll(): Promise<IPost[]>;
  abstract create(post: IPost): Promise<IPost>;
  abstract findByTitle(title: string): Promise<IPost | null>;
}
