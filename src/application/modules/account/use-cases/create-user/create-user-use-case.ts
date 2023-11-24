import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { AccountRepository } from '../../repositories/account-repository';
import { hashSync } from 'bcryptjs';
import { messageHelper } from '@helpers/message-helper';

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
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userExists = await this.accountRepository.findByEmail(email);

    if (userExists) {
      throw new BadRequestException(messageHelper.USER_EXISTS);
    }
    const passwordHash = hashSync(password, 8);

    const user = new User({ email, name, password: passwordHash });

    await this.accountRepository.create(user);

    return { user };
  }
}
