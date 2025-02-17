import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../adapters/repositories/post.repository';
import { NotFoundException } from '@nestjs/common';
import { EditPostUseCase } from './edit-post';

describe('Caso de Uso Editar Post', () => {
  let editPostUseCase: EditPostUseCase;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditPostUseCase,
        {
          provide: PostRepository,
          useValue: {
            getById: jest.fn(),
            editPost: jest.fn(),
          },
        },
      ],
    }).compile();

    editPostUseCase = module.get<EditPostUseCase>(EditPostUseCase);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('deve estar definido', () => {
    expect(editPostUseCase).toBeDefined();
  });

  it('deve lançar NotFoundException se o post não existir', async () => {
    jest.spyOn(postRepository, 'getById').mockResolvedValue(null);

    await expect(
      editPostUseCase.edit('1', {
        title: 'Novo título',
        content: 'Conteúdo',
        author: 'Autor',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve retornar o post atualizado se o post existir', async () => {
    const post = {
      title: 'Título Antigo',
      content: 'Antigo Conteúdo',
      author: 'Antigo autor',
    };
    jest.spyOn(postRepository, 'getById').mockResolvedValue(post);
    jest
      .spyOn(postRepository, 'editPost')
      .mockResolvedValue({ ...post, title: 'Novo título' });

    const updatedPost = await editPostUseCase.edit('1', {
      title: 'Novo título',
      content: 'Novo conteúdo',
      author: 'Novo autor',
    });

    expect(updatedPost).toEqual({ ...post, title: 'Novo título' });
  });
});
