import { IAluno } from './../../entities/aluno.entity';

export interface ICreateAlunoUseCase {
  create(aluno: IAluno): Promise<IAluno>;
}
