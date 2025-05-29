import { IProfessor } from '../entities/professor.entity';

export abstract class ProfessorRepository {
  abstract create(professor: IProfessor): Promise<IProfessor>;
  abstract findAll(): Promise<IProfessor[]>;
  abstract findById(id: string): Promise<IProfessor | null>;
  abstract update(
    id: string,
    professor: Partial<IProfessor>,
  ): Promise<IProfessor | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByEmail(email: string): Promise<IProfessor | null>;
}
