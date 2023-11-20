import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { AccountRepository } from '../../repositories/account-repository';
import { hashSync } from 'bcryptjs';

interface CreateUserUseCaseRequest {
  email: string;
  name: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const passwordHash = hashSync(password, 8);

    const user = new User({ email, name, password: passwordHash });

    await this.accountRepository.create(user);

    return { user };
  }
}
