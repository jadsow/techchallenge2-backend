import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';

@Injectable()
export class GetAllProfessorsUseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute() {
    return this.professorRepository.findAll();
  }
}
