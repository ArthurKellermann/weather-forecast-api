import { Module } from '@nestjs/common';
import { AccountController } from '@infra/http/controllers/account.controller';
import { CreateUserService } from '@app/modules/account/use-cases/create-user';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [CreateUserService],
})
export class HttpModule {}
