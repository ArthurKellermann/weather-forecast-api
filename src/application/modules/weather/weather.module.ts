import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherbitService } from './services/weather-bit/weatherbit.service';
import { GetCurrentWeatherUseCase } from './use-cases/get-current-weather/get-current-weather-use-case';
import { GetWeatherForecastUseCase } from './use-cases/weather-forecast/get-weather-forecast-use-case';

@Module({
  imports: [HttpAxiosModule],
  providers: [
    WeatherbitService,
    GetCurrentWeatherUseCase,
    GetWeatherForecastUseCase,
  ],
  exports: [GetCurrentWeatherUseCase, GetWeatherForecastUseCase],
})
export class WeatherModule {}
