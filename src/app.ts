// ABOUTME: Express application setup and route registration.
// ABOUTME: Exported separately from server startup to allow use in tests.

import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
