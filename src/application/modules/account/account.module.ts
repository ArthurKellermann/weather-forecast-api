import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user-use-case';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class AccountModule {}
