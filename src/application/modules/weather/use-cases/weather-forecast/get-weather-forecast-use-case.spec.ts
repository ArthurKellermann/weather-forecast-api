import { Test, TestingModule } from '@nestjs/testing';
import { GetWeatherForecastUseCase } from './get-weather-forecast-use-case';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import { ByCityNameDto, ByLatLonDto } from '../../dtos/get-weather-data-dto';
import { weatherForecastData } from '@test/fixtures/weather-forecast-data';

describe('GetWeatherForecastUseCase', () => {
  let getWeatherForecastUseCase: GetWeatherForecastUseCase;
  let weatherbitService: WeatherbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetWeatherForecastUseCase,
        {
          provide: WeatherbitService,
          useValue: {
            getWeatherForecastByLatLon: jest.fn(),
            getWeatherForecastByCityName: jest.fn(),
          },
        },
      ],
    }).compile();

    getWeatherForecastUseCase = module.get<GetWeatherForecastUseCase>(
      GetWeatherForecastUseCase,
    );
    weatherbitService = module.get<WeatherbitService>(WeatherbitService);
  });

  describe('executeByCity', () => {
    it('should return weather forecast data by city name', async () => {
      const mockCityInfo: ByCityNameDto = {
        city: 'Raleigh',
        country: 'US',
      };

      jest
        .spyOn(weatherbitService, 'getWeatherForecastByCityName')
        .mockResolvedValueOnce({
          status: true,
          data: weatherForecastData,
        });

      const response =
        await getWeatherForecastUseCase.executeByCity(mockCityInfo);

      expect(response.data).toEqual(weatherForecastData.data);
    });
  });

  describe('executeByLatLon', () => {
    it('should return forecast weather data by latitude and longitude', async () => {
      const mockCityInfo: ByLatLonDto = {
        lat: '35.7796',
        lon: '-78.6382',
      };

      jest
        .spyOn(weatherbitService, 'getWeatherForecastByLatLon')
        .mockResolvedValueOnce({
          status: true,
          data: weatherForecastData,
        });

      const response =
        await getWeatherForecastUseCase.executeByLatLon(mockCityInfo);

      expect(response.data).toEqual(weatherForecastData.data);
    });
  });
});
