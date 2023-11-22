import { Injectable, Inject } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account-repository';
import { User } from '../../entities/user';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.accountRepository.findByEmail(email);
    } catch (e) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
