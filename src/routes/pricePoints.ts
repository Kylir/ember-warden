// ABOUTME: Route handler for POST /price-points.
// ABOUTME: Validates the request, looks up the Avios rate, and returns the four price points.

import { Router } from "express";
import z from "zod";
import { getValuePerAvios } from "../repositories/routeRate";
import { calculatePricePoints } from "../services/pricePoints";

const router = Router();

const RequestSchema = z.object({
  departureAirportCode: z.string().length(3),
  arrivalAirportCode: z.string().length(3),
  departureTime: z.iso.datetime(),
  arrivalTime: z.iso.datetime(),
  price: z.number().positive(),
  currency: z.string().length(3),
});

router.post("/", async (req, res) => {
  const parsed = RequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: z.treeifyError(parsed.error) });
    return;
  }

  const { departureAirportCode, arrivalAirportCode, price } = parsed.data;
  const valuePerAvios = await getValuePerAvios(departureAirportCode, arrivalAirportCode);
  const pricePoints = calculatePricePoints(price, valuePerAvios);

  res.json({ pricePoints });
});

export default router;
