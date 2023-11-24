import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenWeatherMapService } from './services/open-weather-map/open-weather-map.service';
import { GetWeatherMapUseCase } from './use-cases/get-weather-map-use-case';

@Module({
  imports: [HttpAxiosModule],
  providers: [OpenWeatherMapService, GetWeatherMapUseCase],
  exports: [GetWeatherMapUseCase],
})
export class MapModule {}
