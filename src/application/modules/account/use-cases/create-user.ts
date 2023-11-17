import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { AccountRepository } from '../repositories/account-repository';

interface CreateUserServiceRequest {
  email: string;
  name: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

@Injectable()
export class CreateUserService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const user = new User({ email, name, password });

    await this.accountRepository.create(user);

    return;
  }
}
