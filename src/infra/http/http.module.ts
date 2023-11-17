import { Module } from '@nestjs/common';
import { AccountController } from '@infra/http/controllers/account.controller';
import { CreateUserUseCase } from '@app/modules/account/use-cases/create-user-use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { WeatherModule } from '@app/modules/weather/weather.module';
import { WeatherController } from './controllers/weather.controller';

@Module({
  imports: [DatabaseModule, WeatherModule],
  controllers: [AccountController, WeatherController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
