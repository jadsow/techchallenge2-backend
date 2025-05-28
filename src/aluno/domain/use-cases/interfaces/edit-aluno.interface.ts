import { IAluno } from './../../entities/aluno.entity';

export interface IEditAlunoUseCase {
  edit(id: string, aluno: Partial<IAluno>): Promise<IAluno | null>;
}
