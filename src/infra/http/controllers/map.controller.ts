import { JwtAuthGuard } from '@application/modules/account/auth/guards/jwt-auth.guard';
import { GetWeatherMapDto } from '@application/modules/map/dtos/get-weather-map-dto';
import { GetWeatherMapUseCase } from '@application/modules/map/use-cases/get-weather-map-use-case';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

@Controller('api/maps')
@UseGuards(JwtAuthGuard)
export class MapController {
  constructor(private readonly getWeatherMapUseCase: GetWeatherMapUseCase) {}

  @Get('/')
  async getWeatherMap(@Query() { layer, lat, lon }: GetWeatherMapDto) {
    const mapData = await this.getWeatherMapUseCase.executeByLatLon({
      layer,
      lat,
      lon,
    });

    return mapData;
  }
}
