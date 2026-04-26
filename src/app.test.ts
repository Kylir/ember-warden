// ABOUTME: Integration tests for the Express application.
// ABOUTME: Uses supertest to exercise routes without binding a real port.

import request from "supertest";
import app from "./app";

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
