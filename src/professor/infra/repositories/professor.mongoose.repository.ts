import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor, ProfessorDocument } from '../schemas/professor.schema';
import { ProfessorRepository } from '../../domain/repositories/professor.repository';
import { IProfessor } from '../../domain/entities/professor.entity';

@Injectable()
export class ProfessorMongoRepository implements ProfessorRepository {
  constructor(
    @InjectModel(Professor.name)
    private professorModel: Model<ProfessorDocument>,
  ) {}

  async create(professor: IProfessor): Promise<IProfessor> {
    const created = new this.professorModel(professor);
    return created.save();
  }

  async findAll(): Promise<IProfessor[]> {
    return this.professorModel.find().exec();
  }

  async findById(id: string): Promise<IProfessor | null> {
    return this.professorModel.findById(id).exec();
  }

  async update(
    id: string,
    professor: Partial<IProfessor>,
  ): Promise<IProfessor | null> {
    return this.professorModel
      .findByIdAndUpdate(id, professor, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.professorModel.findByIdAndDelete(id).exec();
  }
}
