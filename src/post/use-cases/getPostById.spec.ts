import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../adapters/repositories/post.repository';
import { GetPostById } from './getPostById';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { IPost } from '../entities/post.entity';

describe('GetPostById', () => {
  let getPostById: GetPostById;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostById,
        {
          provide: PostRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    getPostById = module.get<GetPostById>(GetPostById);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('deve estar definido', () => {
    expect(getPostById).toBeDefined();
  });

  it('deve retornar um post se encontrado pelo id', async () => {
    const post: IPost = {
      title: 'Título do Post',
      content: 'Conteúdo do Post',
      author: 'Autor',
    };
    const id = '1';

    jest.spyOn(postRepository, 'getById').mockResolvedValue(post);

    const resultado = await getPostById.getById(id);

    expect(resultado).toEqual(post);
  });

  it('deve lançar NotFoundException se o post não for encontrado', async () => {
    const id = '1';

    jest.spyOn(postRepository, 'getById').mockResolvedValue(null);

    await expect(getPostById.getById(id)).rejects.toThrow(NotFoundException);
  });

  it('deve lançar BadRequestException se ocorrer um erro ao buscar o post', async () => {
    const id = '1';

    jest
      .spyOn(postRepository, 'getById')
      .mockRejectedValue(new Error('Erro no banco de dados'));

    await expect(getPostById.getById(id)).rejects.toThrow(BadRequestException);
  });

  it('deve chamar getById no postRepository com o id correto', async () => {
    const id = '1';
    jest.spyOn(postRepository, 'getById').mockResolvedValue(null); // Retorna null

    await expect(getPostById.getById(id)).rejects.toThrow(NotFoundException);

    expect(postRepository.getById).toHaveBeenCalledWith(id);
  });
});
