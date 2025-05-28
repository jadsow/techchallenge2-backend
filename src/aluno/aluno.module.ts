import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlunoController } from './adapters/controllers/aluno.controller';
import { AlunoRepository } from './domain/repositories/aluno.repository';
import { AlunoMongooseRepository } from './infra/repositories/aluno.mongoose.repository';
import { Aluno, AlunoSchema } from './infra/schemas/aluno.schema';

import { CreateAlunoUseCase } from './domain/use-cases/create-aluno';
import { GetAllAlunoUseCase } from './domain/use-cases/getAll-aluno';
import { EditAlunoUseCase } from './domain/use-cases/edit-aluno';
import { DeleteAlunoUseCase } from './domain/use-cases/delete-aluno';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aluno.name, schema: AlunoSchema }]),
  ],
  controllers: [AlunoController],
  providers: [
    { provide: AlunoRepository, useClass: AlunoMongooseRepository },
    CreateAlunoUseCase,
    GetAllAlunoUseCase,
    EditAlunoUseCase,
    DeleteAlunoUseCase,
  ],
  exports: [
    CreateAlunoUseCase,
    GetAllAlunoUseCase,
    EditAlunoUseCase,
    DeleteAlunoUseCase,
  ],
})
export class AlunoModule {}
