import { Injectable } from '@nestjs/common';
import { IAluno } from '../entities/aluno.entity';
import { AlunoRepository } from '../repositories/aluno.repository';

@Injectable()
export class GetAllAlunoUseCase {
  constructor(private readonly alunoRepository: AlunoRepository) {}
  async getAll(): Promise<IAluno[]> {
    return this.alunoRepository.getAll();
  }
}
