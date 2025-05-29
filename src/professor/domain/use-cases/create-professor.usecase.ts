import { ConflictException, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';
import { IProfessor } from '../../domain/entities/professor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateProfessorUseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(professor: IProfessor): Promise<IProfessor> {
    const existingProfessor = await this.professorRepository.findByEmail(
      professor.email,
    );

    if (existingProfessor) {
      throw new ConflictException(`Professor com este e-mail já existe`);
    }

    professor.senha = await bcrypt.hash(professor.senha, 10);
    professor.role = 'professor';
    return this.professorRepository.create(professor);
  }
}
