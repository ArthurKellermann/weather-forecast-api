import { HttpModule as HttpAxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherbitService } from './services/weatherbit.service';

@Module({
  imports: [HttpAxiosModule],
  providers: [WeatherbitService],
})
export class WeatherBitModule {}
