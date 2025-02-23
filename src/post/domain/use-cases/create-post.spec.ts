import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostUseCase } from './create-post';
import { PostRepository } from '../repositories/post.repository';
import { BadRequestException } from '@nestjs/common';

describe('CreatePostUseCase', () => {
  let createPostUseCase: CreatePostUseCase;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostUseCase,
        {
          provide: PostRepository,
          useValue: {
            findByTitleOrContent: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createPostUseCase = module.get<CreatePostUseCase>(CreatePostUseCase);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('use case definido', () => {
    expect(createPostUseCase).toBeDefined();
  });

  it('erro se um post do mesmo título existir', async () => {
    const existingPost = {
      title: 'Existing Title',
      content: 'Some content',
      author: 'Author',
    };
    jest
      .spyOn(postRepository, 'findByTitleOrContent')
      .mockResolvedValue(existingPost);

    const newPost = {
      title: 'Existing Title',
      content: 'New content',
      author: 'New Author',
    };

    await expect(createPostUseCase.create(newPost)).rejects.toThrow(
      new BadRequestException('Post com este título já existe'),
    );
  });

  it('criar um post se não existir o título', async () => {
    const newPost = {
      title: 'New Title',
      content: 'New content',
      author: 'New Author',
    };
    jest.spyOn(postRepository, 'findByTitleOrContent').mockResolvedValue(null);
    jest.spyOn(postRepository, 'create').mockResolvedValue(newPost);

    const result = await createPostUseCase.create(newPost);

    expect(result).toEqual(newPost);
  });
});
