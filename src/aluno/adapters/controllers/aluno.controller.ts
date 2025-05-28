import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAlunoUseCase } from 'src/aluno/domain/use-cases/create-aluno';
import { GetAllAlunoUseCase } from 'src/aluno/domain/use-cases/getAll-aluno';
import { EditAlunoUseCase } from 'src/aluno/domain/use-cases/edit-aluno';
import { DeleteAlunoUseCase } from 'src/aluno/domain/use-cases/delete-aluno';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('Alunos')
@Controller('alunos')
export class AlunoController {
  constructor(
    private readonly createAlunoUseCase: CreateAlunoUseCase,
    private readonly getAllAlunosUseCase: GetAllAlunoUseCase,
    private readonly updateAlunoUseCase: EditAlunoUseCase,
    private readonly deleteAlunoUseCase: DeleteAlunoUseCase,
  ) {}

  // Somente professores podem criar alunos
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  create(@Body() aluno: any) {
    return this.createAlunoUseCase.create(aluno);
  }

  // Alunos e professores autenticados podem listar alunos
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll() {
    return this.getAllAlunosUseCase.getAll();
  }

  // Somente professores podem editar alunos
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() aluno: any) {
    return this.updateAlunoUseCase.edit(id, aluno);
  }

  // Somente professores podem deletar alunos
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Professor)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.deleteAlunoUseCase.delete(id);
  }
}
