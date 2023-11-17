import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { GetCurrentWeatherUseCase } from '@app/modules/weather/use-cases/get-current-weather/get-current-weather-use-case';
import { GetCurrentWeatherDto } from '../dtos/get-current-weather-dto';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly getCurrentWeatherUseCase: GetCurrentWeatherUseCase,
  ) {}

  @Get('/current')
  async getCurrentWeather(
    @Query() params: GetCurrentWeatherDto,
  ): Promise<void> {
    if (params.lat && params.lon) {
      const weatherData = await this.getCurrentWeatherUseCase.executeByLatLon({
        lat: params.lat,
        lon: params.lon,
      });

      return weatherData;
    } else if (params.city) {
      const weatherData = await this.getCurrentWeatherUseCase.executeByCity({
        city: params.city,
        country: params.country,
        state: params.state,
      });

      return weatherData;
    } else {
      throw new BadRequestException('Parâmetros inválidos.');
    }
  }
}
