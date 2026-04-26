// ABOUTME: Express application setup and route registration.
// ABOUTME: Exported separately from server startup to allow use in tests.

import express from "express";
import pricePointsRouter from "./routes/pricePoints";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/price-points", pricePointsRouter);

export default app;
