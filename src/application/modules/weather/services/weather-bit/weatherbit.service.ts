import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService as HttpAxiosService } from '@nestjs/axios';
import { ByCityDto, ByLatLonDto } from '../../dtos/get-weather-data-dto';
import { lastValueFrom } from 'rxjs';
import { config } from './config';

interface WeatherbitServiceResponse {
  status: boolean;
  data;
}

@Injectable()
export class WeatherbitService {
  constructor(private readonly httpAxiosService: HttpAxiosService) {}

  async getCurrentWeatherByLatLon({
    lat,
    lon,
  }: ByLatLonDto): Promise<WeatherbitServiceResponse> {
    const url = `${config.current_weather_url}?lat=${lat}&lon=${lon}&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }

  async getCurrentWeatherByCity({
    city,
    country,
    state,
  }: ByCityDto): Promise<WeatherbitServiceResponse> {
    let url: string;

    if (country) {
      url = `${config.current_weather_url}?city=${city}&country=${country}`;
    } else if (state) {
      url = `${config.current_weather_url}?city=${city},${state}`;
    } else {
      url = `${config.current_weather_url}?city=${city}`;
    }

    url += `&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }

  async getWeatherForecastByLatLon({ lat, lon }: ByLatLonDto) {
    const url = `${config.weather_forecast_url}?lat=${lat}&lon=${lon}&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }

  async getWeatherForecastByCity({
    city,
    country,
    state,
  }: ByCityDto): Promise<WeatherbitServiceResponse> {
    let url: string;

    if (country) {
      url = `${config.weather_forecast_url}?city=${city}&country=${country}`;
    } else if (state) {
      url = `${config.weather_forecast_url}?city=${city},${state}`;
    } else {
      url = `${config.weather_forecast_url}?city=${city}`;
    }

    url += `&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }
}
