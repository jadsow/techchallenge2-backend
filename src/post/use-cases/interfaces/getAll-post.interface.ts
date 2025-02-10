import { IPost } from '../../entities/post.entity';

export interface IGetAllPostsUseCase {
  getAll(): Promise<IPost[]>;
}
