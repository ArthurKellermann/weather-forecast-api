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
    return await this.getWeatherData(params, 'current');
  }

  @Get('/forecast')
  async getWeatherForecast(@Query() params: GetCurrentWeatherDto) {
    return await this.getWeatherData(params, 'forecast');
  }

  private async getWeatherData(
    params: GetCurrentWeatherDto,
    type: 'current' | 'forecast',
  ) {
    if ((params.lat && params.lon) || params.city) {
      let weatherData;
      if (params.lat && params.lon) {
        weatherData =
          type === 'current'
            ? await this.getCurrentWeatherUseCase.executeByLatLon({
                lat: params.lat,
                lon: params.lon,
              })
            : await this.getWeatherForecastUseCase.executeByLatLon({
                lat: params.lat,
                lon: params.lon,
              });
      } else if (params.city) {
        weatherData =
          type === 'current'
            ? await this.getCurrentWeatherUseCase.executeByCity({
                city: params.city,
                country: params.country,
                state: params.state,
              })
            : await this.getWeatherForecastUseCase.executeByCity({
                city: params.city,
                country: params.country,
                state: params.state,
              });
      }
      return weatherData;
    } else {
      throw new BadRequestException('Invalid params.');
    }
  }
}
