import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService as HttpAxiosService } from '@nestjs/axios';
import {
  ByCityNameInterface,
  ByLatLonInterface,
} from '../../use-cases/get-current-weather/get-current-weather-interfaces';
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
  }: ByLatLonInterface): Promise<WeatherbitServiceResponse> {
    const url = `${config.url}?lat=${lat}&lon=${lon}&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }

  async getCurrentWeatherByCityName({
    city,
    country,
    state,
  }: ByCityNameInterface): Promise<WeatherbitServiceResponse> {
    let url: string;

    if (country) {
      url = `${config.url}?city=${city}&country=${country}`;
    } else if (state) {
      url = `${config.url}?city=${city},${state}`;
    } else {
      url = `${config.url}?city=${city}`;
    }

    url += `&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }
}
