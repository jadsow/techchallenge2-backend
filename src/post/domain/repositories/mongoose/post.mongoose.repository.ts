import { Model } from 'mongoose';
import { PostRepository } from '../../repositories/post.repository';
import { Post } from 'src/post/infra/schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from '../../entities/post.entity';

export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find();
  }

  async create(post: any): Promise<void> {
    const createPost = new this.postModel(post);
    await createPost.save();
    return post;
  }
}
