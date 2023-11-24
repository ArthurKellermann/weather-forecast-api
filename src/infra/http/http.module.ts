import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { CreateUserUseCase } from '@application/modules/account/use-cases/create-user/create-user-use-case';
import { DatabaseModule } from '../database/database.module';
import { WeatherModule } from '@application/modules/weather/weather.module';
import { WeatherController } from './controllers/weather.controller';
import { AccountModule } from '@application/modules/account/account.module';
import { AuthModule } from '@application/modules/account/auth/auth.module';
import { MapModule } from '@application/modules/map/map.module';
import { MapController } from './controllers/map.controller';

@Module({
  imports: [
    DatabaseModule,
    WeatherModule,
    AccountModule,
    AuthModule,
    MapModule,
  ],
  controllers: [AccountController, WeatherController, MapController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
