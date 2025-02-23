import { IPost } from '../../entities/post.entity';

export interface IGetByTitleOrContent {
  findByTitleOrContent(termo: string): Promise<IPost | null>;
}
