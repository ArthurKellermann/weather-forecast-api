export abstract class WeatherRepository {
  abstract getCurrentWeather(): Promise<any>;
}
