import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../adapters/repositories/post.repository';
import { IPost } from '../entities/post.entity';
import { GetAllPostsUseCase } from './getAll-post';

describe('GetAllPostsUseCase', () => {
  let getAllPostsUseCase: GetAllPostsUseCase;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPostsUseCase,
        {
          provide: PostRepository,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllPostsUseCase = module.get<GetAllPostsUseCase>(GetAllPostsUseCase);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('deve estar definido', () => {
    expect(getAllPostsUseCase).toBeDefined();
  });

  it('deve retornar um array de posts', async () => {
    const posts: IPost[] = [
      { title: 'Post 1', content: 'Conteúdo 1', author: 'Autor 1' },
      { title: 'Post 2', content: 'Conteúdo 2', author: 'Autor 2' },
    ];

    jest.spyOn(postRepository, 'getAll').mockResolvedValue(posts);

    const resultado = await getAllPostsUseCase.getAll();

    expect(resultado).toEqual(posts);
  });

  it('deve chamar o método getAll no postRepository', async () => {
    const posts: IPost[] = [
      { title: 'Post 1', content: 'Conteúdo 1', author: 'Autor 1' },
    ];
    jest.spyOn(postRepository, 'getAll').mockResolvedValue(posts);

    await getAllPostsUseCase.getAll();

    expect(postRepository.getAll).toHaveBeenCalled();
  });
});
