import { Test, TestingModule } from '@nestjs/testing';
import { GetCurrentWeatherUseCase } from './get-current-weather-use-case';
import { WeatherbitService } from '../../services/weather-bit/weatherbit.service';
import { currentWeatherData } from '@test/fixtures/current-weather-data';
import { ByCityNameDto, ByLatLonDto } from '../../dtos/get-weather-data-dto';

describe('GetCurrentWeatherUseCase', () => {
  let getCurrentWeatherUseCase: GetCurrentWeatherUseCase;
  let weatherbitService: WeatherbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCurrentWeatherUseCase,
        {
          provide: WeatherbitService,
          useValue: {
            getCurrentWeatherByLatLon: jest.fn(),
            getCurrentWeatherByCityName: jest.fn(),
          },
        },
      ],
    }).compile();

    getCurrentWeatherUseCase = module.get<GetCurrentWeatherUseCase>(
      GetCurrentWeatherUseCase,
    );
    weatherbitService = module.get<WeatherbitService>(WeatherbitService);
  });

  describe('executeByCity', () => {
    it('should return current weather data by city name', async () => {
      const mockCityInfo: ByCityNameDto = {
        city: 'Raleigh',
        country: 'US',
      };
      const mockWeatherData = {
        count: 1,
        data: [currentWeatherData],
      };

      jest
        .spyOn(weatherbitService, 'getCurrentWeatherByCityName')
        .mockResolvedValueOnce({
          status: true,
          data: mockWeatherData,
        });

      const response =
        await getCurrentWeatherUseCase.executeByCity(mockCityInfo);

      expect(response).toEqual(mockWeatherData);
    });
  });

  describe('executeByLatLon', () => {
    it('should return current weather data by latitude and longitude', async () => {
      const mockCityInfo: ByLatLonDto = {
        lat: '35.7796',
        lon: '-78.6382',
      };

      const mockWeatherData = {
        count: 1,
        data: [currentWeatherData],
      };

      jest
        .spyOn(weatherbitService, 'getCurrentWeatherByLatLon')
        .mockResolvedValueOnce({
          status: true,
          data: mockWeatherData,
        });

      const response =
        await getCurrentWeatherUseCase.executeByLatLon(mockCityInfo);

      expect(response).toEqual(mockWeatherData);
    });
  });
});
