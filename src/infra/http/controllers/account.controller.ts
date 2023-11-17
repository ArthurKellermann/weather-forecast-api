import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '@app/modules/account/use-cases/create-user';
import { CreateUserDto } from '@infra/http/dtos/create-user-dto';
import { User } from '@app/modules/account/entities/user';

@Controller('account')
export class AccountController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(
    @Body() { email, name, password }: CreateUserDto,
  ): Promise<User> {
    const { user } = await this.createUserService.execute({
      email,
      name,
      password,
    });

    return user;
  }
}
