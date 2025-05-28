import { IAluno } from './../../entities/aluno.entity';

export interface IGetAllAlunoUseCase {
  getAll(): Promise<IAluno[]>;
}
