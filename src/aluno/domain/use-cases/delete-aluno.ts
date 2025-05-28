import { AlunoRepository } from '../repositories/aluno.repository';
import { IDeleteAlunoUseCase } from './interfaces/delete-aluno.interface';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAlunoUseCase implements IDeleteAlunoUseCase {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async delete(id: string): Promise<void> {
    return this.alunoRepository.delete(id);
  }
}
