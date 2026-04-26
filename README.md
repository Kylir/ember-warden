# Ember Warden

This is my version of the technical exercise. I decided to go for the Optional part 2 - the docker-compose file.
I wrote this code using Claude Code (Model Sonnet 4.6).

The main packages used are: Typescript, ExpressJS, Prisma, Zod and Jest.

It took me around 1 hour and a half to complete.

## Requirements

- Node.js 20+
- Docker and Docker Compose

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your local environment file:
   ```bash
   cp .env.example .env
   ```

## Running the project

Start the PostgreSQL database:
```bash
docker-compose up -d
```

Run the database migrations:
```bash
npm run db:migrate
```

Seed the route rates:
```bash
npm run db:seed
```

Start the API in development mode (with hot reload):
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Running the tests

```bash
npm test
```

## API

### `POST /price-points`

Calculates the four Avios price points for a given flight.

**Request body:**
```json
{
  "departureAirportCode": "LHR",
  "arrivalAirportCode": "LAX",
  "departureTime": "2025-06-01T10:00:00Z",
  "arrivalTime": "2025-06-01T21:00:00Z",
  "price": 500,
  "currency": "GBP"
}
```

**Example curl:**
```bash
curl -s -X POST http://localhost:3000/price-points \
  -H "Content-Type: application/json" \
  -d '{
    "departureAirportCode": "LHR",
    "arrivalAirportCode": "LAX",
    "departureTime": "2025-06-01T10:00:00Z",
    "arrivalTime": "2025-06-01T21:00:00Z",
    "price": 500,
    "currency": "GBP"
  }'
```

**Response:**
```json
{
  "pricePoints": [
    { "percentage": 20, "cashDiscount": 100, "aviosRequired": 3572 },
    { "percentage": 50, "cashDiscount": 250, "aviosRequired": 8929 },
    { "percentage": 70, "cashDiscount": 350, "aviosRequired": 12500 },
    { "percentage": 100, "cashDiscount": 500, "aviosRequired": 17858 }
  ]
}
```

## Improvements

- Logging: At the moment the project is not using any logging library. To improve the observability, it would be good to log API requests, errors, etc.
- Tidy-up the data: The request has unused data (departure and arrival times.) It would be good to simplify the schema.
- Price change API: At the moment the whole backend is doing simple maths on some hardcoded data. To have value, it would be good to offer an API for the admins to update in real time the value of the points.
- User accounts: Another added value for the project would be to have user accounts and store the number of points. 