import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProfessorMongoRepository } from 'src/professor/infra/repositories/professor.mongoose.repository';

@Injectable()
export class ProfessorAuthService {
  constructor(
    private readonly professorRepo: ProfessorMongoRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.professorRepo.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('User:', user);
    const userPlain = user._doc || user;
    const payload = {
      email: userPlain.email,
      sub: userPlain._id,
      role: userPlain.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
