import { IProfessor } from '../entities/professor.entity';

export interface ProfessorRepository {
  create(professor: IProfessor): Promise<IProfessor>;
  findAll(): Promise<IProfessor[]>;
  findById(id: string): Promise<IProfessor | null>;
  update(
    id: string,
    professor: Partial<IProfessor>,
  ): Promise<IProfessor | null>;
  delete(id: string): Promise<void>;
}
