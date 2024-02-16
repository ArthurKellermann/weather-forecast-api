import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpService as HttpAxiosService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { config } from './config';
import { GetWeatherMapDto } from '../../dtos/get-weather-map-dto';

interface OpenWeatherMapServiceResponse {
  status: boolean;
  url: string;
}

@Injectable()
export class OpenWeatherMapService {
  constructor(private readonly httpAxiosService: HttpAxiosService) {}

  async getWeatherMapByLatLon({
    layer,
    lat,
    lon,
  }: GetWeatherMapDto): Promise<OpenWeatherMapServiceResponse> {
    const { x, y, z } = this.convertLatLonToTileCoordinates(lat, lon, 12);
    const url = `${config.api_url}/${layer}/${z}/${x}/${y}.png?appid=${config.api_key}`;

    const response = await lastValueFrom(this.httpAxiosService.get(url));

    console.log(response);

    return {
      status: response.status === HttpStatus.OK,
      url: response.config.url,
    };
  }

  private convertLatLonToTileCoordinates(
    latitude: number,
    longitude: number,
    zoom: number,
  ): { x: number; y: number; z: number } {
    const x = ((longitude + 180) / 360) * Math.pow(2, zoom);
    const y =
      ((1 -
        Math.log(
          Math.tan((latitude * Math.PI) / 180) +
            1 / Math.cos((latitude * Math.PI) / 180),
        ) /
          Math.PI) /
        2) *
      Math.pow(2, zoom);

    return { x: Math.floor(x), y: Math.floor(y), z: zoom };
  }
}
