import { IPost } from 'src/post/entities/post.entity';

export interface IEditInterface {
  edit(id: string, post: IPost): Promise<IPost | null>;
}
