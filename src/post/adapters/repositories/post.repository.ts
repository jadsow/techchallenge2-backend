import { IPost } from './../../entities/post.entity';

export abstract class PostRepository {
  abstract getAll(): Promise<IPost[]>;
  abstract getById(id: string): Promise<IPost | null>;
  abstract create(post: IPost): Promise<IPost>;
  abstract findByTitleOrContent(termo: string): Promise<IPost | null>;
}
