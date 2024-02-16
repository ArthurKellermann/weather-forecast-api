# Weather Forecast API

This project utilizes NestJS, Prisma, and SQLite to provide weather forecast information. It includes routes for user account creation, authentication, and fetching current weather and weather forecasts.

## What I Learned

During the development of this project, I gained experience in:

- Implementing Clean Architecture principles to structure the project, ensuring separation of concerns and maintainability.
- Setting up authentication in NestJS using middleware and guards to secure routes and endpoints.
- Writing unit tests and end-to-end tests to ensure the reliability and correctness of the application.
- Consuming external APIs to fetch weather map data and integrate it into the application.
  
## Installation

- Clone the repository;
- Install dependencies (`npm install`);
- Run database migrations (`npx prisma migrate dev`);
- Copy `.env.example` file (`cp .env.example .env`);
- Start the server: (`npm run start`).

## API Routes

### User Account

- **Create Account**
  - Method: `POST`
  - Route: `/api/account`
  - Request Body:
    ```
    {
      "email": "example@example.com",
      "name": "First Last",
      "password": "password"
    }
    ```
  - Description: Creates a new user account.

- **Authentication**
  - Method: `POST`
  - Route: `/api/account/auth`
  - Description: Authenticates a user and returns an access token.

### Weather Maps

- **Get Weather Map**
  - Method: `GET`
  - Route: `/api/maps`
  - Query Parameters:
    - `layer`: Weather map layer
    - `lat`: Latitude
    - `lon`: Longitude
  - Description: Retrieves weather map data for a specific location.

### Weather Forecast

- **Get Current Weather**
  - Method: `GET`
  - Route: `/api/weather/current`
  - Query Parameters:
    - `lat`: Latitude
    - `lon`: Longitude
    - `city`: City name
    - `country`: Country code (optional)
    - `state`: State (optional)
  - Description: Retrieves current weather data for a specific location.

- **Get Weather Forecast**
  - Method: `GET`
  - Route: `/api/weather/forecast`
  - Query Parameters:
    - `lat`: Latitude
    - `lon`: Longitude
    - `city`: City name
    - `country`: Country code (optional)
    - `state`: State (optional)
  - Description: Retrieves weather forecast data for a specific location.

## Notes

- Ensure to authenticate with the JWT token obtained after creating a user account before accessing `/api/account` and `/api/account/auth` routes.
- Authentication with JWT token is also required for accessing `/api/maps` and `/api/weather` routes.
- Make sure to pass the correct parameters when calling weather data fetching routes.
- This project uses Prisma as the ORM to interact with the SQLite database. Ensure to correctly configure the `.env` file with the database credentials.
