import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateProfessorUseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async execute(id: string, data: any) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return this.professorRepository.update(id, data);
  }
}
