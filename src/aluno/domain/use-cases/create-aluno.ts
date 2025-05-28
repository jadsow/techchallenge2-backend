import { Injectable } from '@nestjs/common';
import { IAluno } from './../entities/aluno.entity';
import { ICreateAlunoUseCase } from './interfaces/create-aluno.interface';
import { AlunoRepository } from '../repositories/aluno.repository';

@Injectable()
export class CreateAlunoUseCase implements ICreateAlunoUseCase {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async create(aluno: IAluno): Promise<IAluno> {
    return this.alunoRepository.create(aluno);
  }
}
