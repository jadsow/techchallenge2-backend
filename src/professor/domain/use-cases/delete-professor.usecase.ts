import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';

@Injectable()
export class DeleteProfessorUseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string) {
    return this.professorRepository.delete(id);
  }
}
