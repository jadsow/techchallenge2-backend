import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProfessorUseCase } from '../../domain/use-cases/create-professor.usecase';
import { GetAllProfessorsUseCase } from '../../domain/use-cases/get-all-professors.usecase';
import { GetProfessorByIdUseCase } from '../../domain/use-cases/get-professor-by-id.usecase';
import { UpdateProfessorUseCase } from '../../domain/use-cases/update-professor.usecase';
import { DeleteProfessorUseCase } from '../../domain/use-cases/delete-professor.usecase';
import { IProfessor } from '../../domain/entities/professor.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('Professores')
@Controller('professores')
export class ProfessorController {
  constructor(
    private readonly createProfessor: CreateProfessorUseCase,
    private readonly getAllProfessors: GetAllProfessorsUseCase,
    private readonly getProfessorById: GetProfessorByIdUseCase,
    private readonly updateProfessor: UpdateProfessorUseCase,
    private readonly deleteProfessor: DeleteProfessorUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  create(@Body() professor: IProfessor) {
    return this.createProfessor.execute(professor);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor, Role.Aluno)
  @ApiBearerAuth()
  findAll() {
    return this.getAllProfessors.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor, Role.Aluno)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.getProfessorById.execute(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() professor: Partial<IProfessor>) {
    return this.updateProfessor.execute(id, professor);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.deleteProfessor.execute(id);
  }
}
