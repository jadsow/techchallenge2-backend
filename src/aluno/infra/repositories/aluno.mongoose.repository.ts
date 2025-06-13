import { Injectable } from "@nestjs/common";
import { AlunoRepository } from "src/aluno/domain/repositories/aluno.repository";
import { IAluno } from "src/aluno/domain/entities/aluno.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Aluno } from "../schemas/aluno.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class AlunoMongooseRepository implements AlunoRepository {
  constructor(@InjectModel(Aluno.name) private alunoModel: Model<Aluno>) {}

  async create(aluno: IAluno): Promise<IAluno> {
    const saltRounds = 10;
    aluno.senha = await bcrypt.hash(aluno.senha, saltRounds);

    const created = new this.alunoModel(aluno);
    return created.save();
  }

  async getAll(): Promise<IAluno[]> {
    return this.alunoModel.find().exec();
  }

  async getById(id: string): Promise<IAluno | null> {
    return this.alunoModel.findById(id).exec();
  }

  async update(id: string, aluno: Partial<IAluno>): Promise<IAluno | null> {
    return this.alunoModel.findByIdAndUpdate(id, aluno, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.alunoModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<IAluno | null> {
    return this.alunoModel.findOne({ email }).exec();
  }
}
