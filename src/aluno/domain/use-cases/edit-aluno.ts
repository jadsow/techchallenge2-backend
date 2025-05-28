import { IEditAlunoUseCase } from './interfaces/edit-aluno.interface';
import { IAluno } from 'src/aluno/domain/entities/aluno.entity';
import { AlunoRepository } from '../repositories/aluno.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EditAlunoUseCase implements IEditAlunoUseCase {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async edit(id: string, aluno: IAluno): Promise<IAluno | null> {
    const existingAluno = await this.alunoRepository.getById(id);
    if (!existingAluno) {
      throw new NotFoundException(`Aluno com o id ${id} não encontrado`);
    }
    return this.alunoRepository.update(id, aluno);
  }
}
