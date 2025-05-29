import { ConflictException, Injectable } from '@nestjs/common';
import { IAluno } from './../entities/aluno.entity';
import { ICreateAlunoUseCase } from './interfaces/create-aluno.interface';
import { AlunoRepository } from '../repositories/aluno.repository';

@Injectable()
export class CreateAlunoUseCase implements ICreateAlunoUseCase {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async create(aluno: IAluno): Promise<IAluno> {
    const existingAluno = await this.alunoRepository.findByEmail(aluno.email);

    if (existingAluno) {
      throw new ConflictException(`Aluno com o email ${aluno.email} já existe`);
    }
    return this.alunoRepository.create(aluno);
  }
}
