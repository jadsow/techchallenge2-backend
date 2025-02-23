import { IPost } from '../../entities/post.entity';

export interface ICreatePostUseCase {
  create(post: IPost): Promise<IPost>;
}
