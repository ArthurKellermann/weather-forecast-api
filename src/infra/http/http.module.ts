import { Module } from '@nestjs/common';
import { AccountController } from '@infra/http/controllers/account.controller';
import { CreateUserUseCase } from '@app/modules/account/use-cases/create-user/create-user-use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { WeatherModule } from '@app/modules/weather/weather.module';
import { WeatherController } from './controllers/weather.controller';
import { AccountModule } from '@app/modules/account/account.module';
import { AuthModule } from '@app/modules/account/auth/auth.module';

@Module({
  imports: [DatabaseModule, WeatherModule, AccountModule, AuthModule],
  controllers: [AccountController, WeatherController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
