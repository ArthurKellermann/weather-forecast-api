import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { CreateUserUseCase } from '@application/modules/account/use-cases/create-user/create-user-use-case';
import { DatabaseModule } from '../database/database.module';
import { WeatherModule } from '@application/modules/weather/weather.module';
import { WeatherController } from './controllers/weather.controller';
import { AccountModule } from '@application/modules/account/account.module';
import { AuthModule } from '@application/modules/account/auth/auth.module';

@Module({
  imports: [DatabaseModule, WeatherModule, AccountModule, AuthModule],
  controllers: [AccountController, WeatherController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
