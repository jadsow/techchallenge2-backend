import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../adapters/repositories/post.repository';
import { IPost } from '../entities/post.entity';
import { FindByTitleOrContentUseCase } from './getByTitleOrContent';

describe('FindByTitleOrContentUseCase', () => {
  let findByTitleOrContentUseCase: FindByTitleOrContentUseCase;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByTitleOrContentUseCase,
        {
          provide: PostRepository,
          useValue: {
            findByTitleOrContent: jest.fn(),
          },
        },
      ],
    }).compile();

    findByTitleOrContentUseCase = module.get<FindByTitleOrContentUseCase>(
      FindByTitleOrContentUseCase,
    );
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('deve estar definido', () => {
    expect(findByTitleOrContentUseCase).toBeDefined();
  });

  it('deve retornar um post se encontrado pelo título ou conteúdo', async () => {
    const post: IPost = {
      title: 'Título do Post',
      content: 'Conteúdo do Post',
      author: 'Autor',
    };

    const termo = 'Título do Post';

    jest.spyOn(postRepository, 'findByTitleOrContent').mockResolvedValue(post);

    const resultado =
      await findByTitleOrContentUseCase.findByTitleOrContent(termo);

    expect(resultado).toEqual(post);
  });

  it('deve retornar null se nenhum post for encontrado pelo título ou conteúdo', async () => {
    const termo = 'Post Inexistente';

    jest.spyOn(postRepository, 'findByTitleOrContent').mockResolvedValue(null);

    const resultado =
      await findByTitleOrContentUseCase.findByTitleOrContent(termo);

    expect(resultado).toBeNull();
  });

  it('deve chamar o método findByTitleOrContent no postRepository', async () => {
    const termo = 'Título do Post';
    jest.spyOn(postRepository, 'findByTitleOrContent').mockResolvedValue(null);

    await findByTitleOrContentUseCase.findByTitleOrContent(termo);

    expect(postRepository.findByTitleOrContent).toHaveBeenCalledWith(termo);
  });
});
