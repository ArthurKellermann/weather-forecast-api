import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '@app/modules/account/use-cases/create-user/create-user-use-case';
import { CreateUserDto } from '@infra/http/dtos/create-user-dto';
import { User } from '@app/modules/account/entities/user';

import { AuthService } from '@app/modules/account/auth/services/auth.service';
import { LocalAuthGuard } from '@app/modules/account/auth/guards/jwt-local.guard';

@Controller('api/account')
export class AccountController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authService: AuthService,
  ) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async auth(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
