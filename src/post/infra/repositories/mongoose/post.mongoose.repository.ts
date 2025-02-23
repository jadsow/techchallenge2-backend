import { IPost } from 'src/post/domain/entities/post.entity';
import { Model } from 'mongoose';
import { PostRepository } from 'src/post/domain/repositories/post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/post/infra/schemas/post.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getAll(): Promise<IPost[]> {
    return await this.postModel.find();
  }

  async getById(id: string): Promise<IPost | null> {
    return await this.postModel.findById(id).exec();
  }

  async create(post: any): Promise<IPost> {
    const createPost = new this.postModel(post);
    await createPost.save();
    return post;
  }

  async findByTitleOrContent(termo: string): Promise<IPost | null> {
    return this.postModel
      .findOne({
        $or: [
          { title: { $regex: termo, $options: 'i' } },
          { content: { $regex: termo, $options: 'i' } },
        ],
      })
      .exec();
  }

  async editPost(id: string, post: Partial<IPost>): Promise<IPost | null> {
    return await this.postModel.findByIdAndUpdate(
      id,
      { $set: post },
      { new: true },
    );
  }

  async deletePost(id: string): Promise<void | null> {
    return await this.postModel.findByIdAndDelete(id);
  }
}
