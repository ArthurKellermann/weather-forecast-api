import { Injectable } from '@nestjs/common';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import { ByLatLonInterface } from './get-current-weather-interfaces';

@Injectable()
export class GetCurrentWeatherUseCase {
  constructor(private readonly weatherbitService: WeatherbitService) {}

  async execute(data: ByLatLonInterface): Promise<any> {
    const { data: weatherData, status } =
      await this.weatherbitService.getCurrentWeatherByLatLon({
        lat: data.lat,
        lon: data.lon,
      });

    if (status) {
      return weatherData;
    }

    return null;
  }
}
