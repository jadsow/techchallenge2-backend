import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Aluno extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true, default: 'aluno' })
  role: string;
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
