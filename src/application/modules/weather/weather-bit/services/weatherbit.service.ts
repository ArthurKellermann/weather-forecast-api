import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ByLatLon } from '../interfaces/get-current-weather-interfaces';
import { config } from '../client';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherbitService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeatherByLatLon({ lat, lon }: ByLatLon): Promise<boolean> {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${config.api_key}&include=minutely`;

    const response = await lastValueFrom(this.httpService.get(url));

    console.log(response.data);

    return response.status === HttpStatus.ACCEPTED;
  }
}
