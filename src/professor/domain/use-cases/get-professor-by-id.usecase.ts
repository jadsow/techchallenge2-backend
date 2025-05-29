import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';

@Injectable()
export class GetProfessorByIdUseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string) {
    return this.professorRepository.findById(id);
  }
}
