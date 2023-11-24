import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService as HttpAxiosService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { config } from './config';
import { GetWeatherMapDto } from '../../dtos/get-weather-map-dto';

interface OpenWeatherMapServiceResponse {
  status: boolean;
  data;
}

@Injectable()
export class OpenWeatherMapService {
  constructor(private readonly httpAxiosService: HttpAxiosService) {}

  async getWeatherMapByLatLon({
    layer,
    lat,
    lon,
  }: GetWeatherMapDto): Promise<OpenWeatherMapServiceResponse> {
    const url = `${config.api_url}/${layer}/12/654/1582?lat=${lat}&lon=${lon}&appid=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    return {
      status: response.status === HttpStatus.OK,
      data: response.data,
    };
  }
}
