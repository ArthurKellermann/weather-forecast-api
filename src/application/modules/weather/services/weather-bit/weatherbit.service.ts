import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ByLatLonInterface } from '../../use-cases/get-current-weather/get-current-weather-interfaces';
import { lastValueFrom } from 'rxjs';
import { config } from './config';

interface WeatherbitServiceResponse {
  status: boolean;
  data;
}

@Injectable()
export class WeatherbitService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeatherByLatLon({
    lat,
    lon,
  }: ByLatLonInterface): Promise<WeatherbitServiceResponse> {
    const url = `${config.url}?lat=${lat}&lon=${lon}&key=${config.api_key}`;

    const response = await lastValueFrom(this.httpService.get(url));

    console.log(response.data);

    return {
      status: response.status === HttpStatus.ACCEPTED,
      data: response.data,
    };
  }
}
