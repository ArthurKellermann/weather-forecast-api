export const config = {
  api_key: process.env.API_KEY,
  token: `Bearer ${process.env.API_KEY}`,
  url: 'https://api.weatherbit.io/v2.0/current',
};
