import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenWeatherMapService } from '../services/open-weather-map/open-weather-map.service';
import { GetWeatherMapDto } from '../dtos/get-weather-map-dto';

@Injectable()
export class GetWeatherMapUseCase {
  constructor(private readonly openWeatherMapService: OpenWeatherMapService) {}

  async executeByLatLon({ layer, lat, lon }: GetWeatherMapDto): Promise<any> {
    const { url, status } =
      await this.openWeatherMapService.getWeatherMapByLatLon({
        layer,
        lat,
        lon,
      });

    if (!status) {
      throw new BadRequestException();
    }

    return { url };
  }
}
