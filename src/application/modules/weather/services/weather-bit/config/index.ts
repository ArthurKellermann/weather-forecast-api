export const config = {
  api_key: process.env.API_KEY,
  token: `Bearer ${process.env.API_KEY}`,
  current_weather_url: 'https://api.weatherbit.io/v2.0/current',
  weather_forecast_url: 'https://api.weatherbit.io/v2.0/forecast/daily',
};
