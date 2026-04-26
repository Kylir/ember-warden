// ABOUTME: Avios value-per-point rates keyed by flight route.
// ABOUTME: Returns the route-specific rate, or the default if the route is not listed.

const ROUTE_RATES: Record<string, number> = {
  "LHR-LAX": 0.028,
  "LHR-AMS": 0.025,
  "LHR-JFK": 0.03,
  "LGW-LAX": 0.027,
  "LGW-MUC": 0.024,
};

const DEFAULT_RATE = 0.02;

export function getValuePerAvios(departure: string, arrival: string): number {
  return ROUTE_RATES[`${departure}-${arrival}`] ?? DEFAULT_RATE;
}
