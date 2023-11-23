export class WeatherForecastMapper {
  static mapWeatherDataObject(weatherData: any) {
    return {
      max_temp: weatherData.max_temp,
      min_temp: weatherData.min_temp,
      app_max_temp: weatherData.app_max_temp,
      app_min_temp: weatherData.app_min_temp,
      wind_spd: weatherData.wind_spd,
      clouds: weatherData.clouds,
      valid_date: weatherData.valid_date,
      weather: {
        description: weatherData.weather
          ? weatherData.weather.description
          : null,
        code: weatherData.weather ? weatherData.weather.code : null,
      },
    };
  }

  static mapWeatherData(weatherData: any) {
    const mappedData = [];

    for (const data of weatherData.data) {
      mappedData.push(this.mapWeatherDataObject(data));
    }

    return {
      message: 'Weather forecast for the next 16 days',
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
