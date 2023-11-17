import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { AccountRepository } from '../../repositories/account-repository';

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
    const user = new User({ email, name, password });

    await this.accountRepository.create(user);

    return;
  }
}
