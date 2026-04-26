# Ember Warden

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
