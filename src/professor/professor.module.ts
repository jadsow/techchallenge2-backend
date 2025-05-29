import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorController } from './adapters/controllers/professor.controller';
import { Professor, ProfessorSchema } from './infra/schemas/professor.schema';
import { ProfessorMongoRepository } from './infra/repositories/professor.mongoose.repository';
import { CreateProfessorUseCase } from './domain/use-cases/create-professor.usecase';
import { GetAllProfessorsUseCase } from './domain/use-cases/get-all-professors.usecase';
import { GetProfessorByIdUseCase } from './domain/use-cases/get-professor-by-id.usecase';
import { UpdateProfessorUseCase } from './domain/use-cases/update-professor.usecase';
import { DeleteProfessorUseCase } from './domain/use-cases/delete-professor.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
    ]),
  ],
  controllers: [ProfessorController],
  providers: [
    ProfessorMongoRepository,
    { provide: 'ProfessorRepository', useExisting: ProfessorMongoRepository },
    CreateProfessorUseCase,
    GetAllProfessorsUseCase,
    GetProfessorByIdUseCase,
    UpdateProfessorUseCase,
    DeleteProfessorUseCase,
  ],
})
export class ProfessorModule {}
