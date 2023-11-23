import { BadRequestException, Injectable } from '@nestjs/common';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import { ByCityNameDto, ByLatLonDto } from '../../dtos/get-weather-data-dto';
import { WeatherForecastMapper } from '../../mappers/weather-forecast-mapper';

@Injectable()
export class GetWeatherForecastUseCase {
  constructor(private readonly weatherbitService: WeatherbitService) {}

  async executeByLatLon({ lat, lon }: ByLatLonDto): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getWeatherForecastByLatLon({
        lat,
        lon,
      });

    if (!status) {
      throw new BadRequestException('Bad request');
    }

    return WeatherForecastMapper.mapWeatherData(data);
  }

  async executeByCity({ city, country, state }: ByCityNameDto): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getWeatherForecastByCityName({
        city,
        country,
        state,
      });

    if (!status) {
      throw new Error('Bad request');
    }

    return WeatherForecastMapper.mapWeatherData(data);
  }
}
