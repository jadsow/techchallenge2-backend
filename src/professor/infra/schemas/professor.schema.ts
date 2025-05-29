import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfessorDocument = Professor & Document;

@Schema()
export class Professor {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ default: 'professor' })
  role: string;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
