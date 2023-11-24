import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentWeatherUseCase } from '@application/modules/weather/use-cases/get-current-weather/get-current-weather-use-case';
import { GetCurrentWeatherDto } from '../dtos/get-current-weather-dto';
import { JwtAuthGuard } from '@application/modules/account/auth/guards/jwt-auth.guard';
import { GetWeatherForecastUseCase } from '@application/modules/weather/use-cases/weather-forecast/get-weather-forecast-use-case';

@Controller('api/weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(
    private readonly getCurrentWeatherUseCase: GetCurrentWeatherUseCase,
    private readonly getWeatherForecastUseCase: GetWeatherForecastUseCase,
  ) {}

  @Get('/current')
  async getCurrentWeather(@Query() params: GetCurrentWeatherDto) {
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
      throw new BadRequestException('Invalid params.');
    }
  }

  @Get('/forecast')
  async getWeatherForecast(@Query() params: GetCurrentWeatherDto) {
    if (params.lat && params.lon) {
      const weatherData = await this.getWeatherForecastUseCase.executeByLatLon({
        lat: params.lat,
        lon: params.lon,
      });

      return weatherData;
    } else if (params.city) {
      const weatherData = await this.getWeatherForecastUseCase.executeByCity({
        city: params.city,
        country: params.country,
        state: params.state,
      });

      return weatherData;
    } else {
      throw new BadRequestException('Invalid params.');
    }
  }
}
