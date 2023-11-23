import { BadRequestException, Injectable } from '@nestjs/common';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import { ByCityNameDto, ByLatLonDto } from '../../dtos/get-weather-data-dto';

@Injectable()
export class GetCurrentWeatherUseCase {
  constructor(private readonly weatherbitService: WeatherbitService) {}

  async executeByLatLon({ lat, lon }: ByLatLonDto): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getCurrentWeatherByLatLon({
        lat,
        lon,
      });

    if (!status) {
      throw new BadRequestException('Bad request');
    }

    return data;
  }

  async executeByCity({ city, country, state }: ByCityNameDto): Promise<any> {
    const { data, status } =
      await this.weatherbitService.getCurrentWeatherByCityName({
        city,
        country,
        state,
      });

    if (!status) {
      throw new Error('Bad request');
    }

    return data;
  }
}
