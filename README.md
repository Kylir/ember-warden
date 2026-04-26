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
  }' | jq
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

---

# Technical Test

## Original brief

### Context
Imagine a customer has a certain number of Avios points which they would like to redeem on an upcoming trip. They have decided to fly with British Airways, and have navigated to their website (www.britishairways.com) in order to book a flight. Upon landing on the payment page, they should be presented with four price options (called price points) to choose from in order to use their Avios to discount the total price of the flight, or they can choose not to use any Avios.
These price points should be set percentages worth 20%, 50%, 70% or 100% of the price of the flight (the cash discount). The amount of Avios required for each price point will be calculated using a static value per Avios based on the flight route from the table below. There will be five key routes where a different rate is used, otherwise the default value of 0.02 should be used for all other routes.


| Departure Airport Code | Arrival Airport Code | Value per Avios |
| :---- | :---- | :---- |
| LHR | LAX | 0.028 |
| LHR | AMS | 0.025 |
| LHR | JFK | 0.03 |
| LGW | LAX | 0.027 |
| LGW | MUC | 0.024 |
| \- | \- | 0.02 |

### The Task
A REST web service needs to be created containing the logic to calculate the price points. Your API will be called by the website, and the response of the API (containing the price points) will be rendered by the website for the customer to choose from.
API Contract
The API should expose one endpoint which will accept the following request data in order to do the calculation:

- DepartureAirportCode
- ArrivalAirportCode
- DepartureTime
- ArrivalTime
- Price
- Currency

The API should respond with the four price points, containing the calculated cash discount and the Avios amount for that price point.
