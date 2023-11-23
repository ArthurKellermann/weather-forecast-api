import { BadRequestException, Injectable } from '@nestjs/common';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import {
  ByCityNameInterface,
  ByLatLonInterface,
} from '../../interfaces/request-params-interface';
import { WeatherForecaseMapper } from '../../mappers/weather-forecast-mapper';

@Injectable()
export class GetWeatherForecastUseCase {
  constructor(private readonly weatherbitService: WeatherbitService) {}

  async executeByLatLon({ lat, lon }: ByLatLonInterface): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getWeatherForecastByLatLon({
        lat,
        lon,
      });

    if (!status) {
      throw new BadRequestException('Bad request');
    }

    return data;
  }

  async executeByCity({
    city,
    country,
    state,
  }: ByCityNameInterface): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getWeatherForecastByCityName({
        city,
        country,
        state,
      });

    if (!status) {
      throw new Error('Bad request');
    }

    return WeatherForecaseMapper.mapWeatherData(data);
  }
}
