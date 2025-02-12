import { IPost } from '../../entities/post.entity';

export interface IGetById {
  getById(id: string): Promise<IPost | null>;
}
