import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { currentWeatherData } from './fixtures/current-weather-data';

describe('WeatherController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get current weather by latitude and longitude', () => {
    return request(app.getHttpServer())
      .get('/api/weather/current')
      .query({ lat: 123, lon: 456 })
      .expect(200)
      .expect(currentWeatherData);
  });

  it('should get current weather by city', () => {
    return request(app.getHttpServer())
      .get('/api/weather/current')
      .query({ city: 'London', country: 'GB' })
      .expect(200)
      .expect(currentWeatherData);
  });

  it('should return 400 for invalid params', () => {
    return request(app.getHttpServer()).get('/api/weather/current').expect(400);
  });
});
