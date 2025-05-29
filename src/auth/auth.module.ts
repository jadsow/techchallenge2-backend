import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AlunoModule } from '../aluno/aluno.module';
import { ProfessorAuthService } from './authProfessor.service';
import { ProfessorModule } from 'src/professor/professor.module';

@Module({
  imports: [
    AlunoModule,
    ProfessorModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, ProfessorAuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, ProfessorAuthService],
})
export class AuthModule {}
