import { IAluno } from '../entities/aluno.entity';

export abstract class AlunoRepository {
  abstract create(aluno: IAluno): Promise<IAluno>;
  abstract getAll(): Promise<IAluno[]>;
  abstract getById(id: string): Promise<IAluno | null>;
  abstract update(id: string, aluno: Partial<IAluno>): Promise<IAluno | null>;
  abstract delete(id: string): Promise<void>;
}
