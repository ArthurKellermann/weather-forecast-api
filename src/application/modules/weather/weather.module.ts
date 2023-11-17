import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherbitService } from './services/weather-bit/weatherbit.service';
import { GetCurrentWeatherUseCase } from './use-cases/get-current-weather/get-current-weather-use-case';

@Module({
  imports: [HttpAxiosModule],
  providers: [WeatherbitService, GetCurrentWeatherUseCase],
  exports: [GetCurrentWeatherUseCase],
})
export class WeatherModule {}
