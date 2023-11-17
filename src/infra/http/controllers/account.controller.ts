import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '@app/modules/account/use-cases/create-user/create-user-use-case';
import { CreateUserDto } from '@infra/http/dtos/create-user-dto';
import { User } from '@app/modules/account/entities/user';

@Controller('account')
export class AccountController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @Body() { email, name, password }: CreateUserDto,
  ): Promise<User> {
    const { user } = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return user;
  }
}
