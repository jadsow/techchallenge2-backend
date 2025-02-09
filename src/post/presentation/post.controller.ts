import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from '../application/post.service';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

type CreatePost = z.infer<typeof postSchema>;

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAll() {
    return await this.postService.getAll();
  }

  @Post()
  async create(@Body() { title, content, author }: CreatePost): Promise<void> {
    return await this.postService.createPost({ title, content, author });
  }
}
