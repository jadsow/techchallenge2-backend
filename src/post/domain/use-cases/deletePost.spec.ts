import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../repositories/post.repository';
import { NotFoundException } from '@nestjs/common';
import { DeletePost } from './deletePost';

describe('Caso de Uso DeletePost', () => {
  let deletePostUseCase: DeletePost;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePost,
        {
          provide: PostRepository,
          useValue: {
            getById: jest.fn(),
            deletePost: jest.fn(),
          },
        },
      ],
    }).compile();

    deletePostUseCase = module.get<DeletePost>(DeletePost);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('deve estar definido', () => {
    expect(deletePostUseCase).toBeDefined();
  });

  it('deve lançar NotFoundException se o post não existir', async () => {
    jest.spyOn(postRepository, 'getById').mockResolvedValue(null);

    await expect(deletePostUseCase.delete('1')).rejects.toThrow(
      new NotFoundException('Post não encontrado'),
    );
  });

  it('deve chamar deletePost se o post existir', async () => {
    const post = {
      title: 'Título do Post',
      content: 'Conteúdo do Post',
      author: 'Autor',
    };
    jest.spyOn(postRepository, 'getById').mockResolvedValue(post);
    const deleteSpy = jest
      .spyOn(postRepository, 'deletePost')
      .mockResolvedValue(null);

    await deletePostUseCase.delete('1');

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });
});
