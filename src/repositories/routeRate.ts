// ABOUTME: Retrieves the Avios value-per-point rate for a given flight route from the database.
// ABOUTME: Falls back to the default rate row when no route-specific entry exists.

import prisma from "../db/client";

export async function getValuePerAvios(departure: string, arrival: string): Promise<number> {
  const route = await prisma.routeRate.findFirst({
    where: { departureCode: departure, arrivalCode: arrival },
  });

  if (route) return route.valuePerAvios;

  const defaultRoute = await prisma.routeRate.findFirst({
    where: { departureCode: null, arrivalCode: null },
  });

  return defaultRoute!.valuePerAvios;
}
