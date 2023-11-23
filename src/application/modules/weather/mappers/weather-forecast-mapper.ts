export class WeatherForecaseMapper {
  static mapWeatherDataObject(weatherData: any) {
    return {
      max_temp: weatherData.max_temp,
      min_tempo: weatherData.min_temp,
      app_max_temp: weatherData.app_max_temp,
      app_min_tempo: weatherData.app_min_temp,
      wind_spd: weatherData.wind_spd,
      clouds: weatherData.clouds,
      datetime: weatherData.valid_date,
      weather: {
        description: weatherData.weather.description,
        code: weatherData.weather.code,
      },
    };
  }

  static mapWeatherData(weatherData: any) {
    const mappedData = [];

    for (const data of weatherData.data) {
      mappedData.push(this.mapWeatherDataObject(data));
    }

    return {
      message: `Weather forecast for the next 16 days in ${weatherData.city_name}`,
      city: weatherData.city_name,
      country: weatherData.country_code,
      data: mappedData,
      lat: weatherData.lat,
      lon: weatherData.lon,
      state_code: weatherData.state_code,
      timezone: weatherData.timezone,
    };
  }
}
