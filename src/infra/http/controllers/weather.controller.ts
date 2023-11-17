import { Controller, Get, Query } from '@nestjs/common';
import { GetCurrentWeatherUseCase } from '@app/modules/weather/use-cases/get-current-weather/get-current-weather-use-case';
import { GetCurrentWeatherLatLonDto } from '../dtos/get-current-weather-dto';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly getCurrentWeatherUseCase: GetCurrentWeatherUseCase,
  ) {}

  @Get('/current')
  async getCurrentWeather(
    @Query() params: GetCurrentWeatherLatLonDto,
  ): Promise<void> {
    const weatherData = await this.getCurrentWeatherUseCase.execute({
      lat: params.lat,
      lon: params.lon,
    });

    return weatherData;
  }
}
