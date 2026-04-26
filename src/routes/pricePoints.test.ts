// ABOUTME: API-level tests for POST /price-points.
// ABOUTME: Covers happy path responses and Zod validation rejections.

import request from "supertest";
import app from "../app";

const validBody = {
  departureAirportCode: "LHR",
  arrivalAirportCode: "LAX",
  departureTime: "2025-06-01T10:00:00Z",
  arrivalTime: "2025-06-01T21:00:00Z",
  price: 100,
  currency: "GBP",
};

describe("POST /price-points", () => {
  describe("valid request", () => {
    it("returns 200 with four price points", async () => {
      const res = await request(app).post("/price-points").send(validBody);
      expect(res.status).toBe(200);
      expect(res.body.pricePoints).toHaveLength(4);
    });

    it("returns price points with the correct shape", async () => {
      const res = await request(app).post("/price-points").send(validBody);
      for (const point of res.body.pricePoints) {
        expect(point).toMatchObject({
          percentage: expect.any(Number),
          cashDiscount: expect.any(Number),
          aviosRequired: expect.any(Number),
        });
      }
    });

    it("uses the route-specific rate for a known route (LHR→LAX)", async () => {
      const res = await request(app).post("/price-points").send(validBody);
      // LHR-LAX rate: 0.028; 20% of 100 = 20; ceil(20 / 0.028) = 715
      expect(res.body.pricePoints[0]).toEqual({
        percentage: 20,
        cashDiscount: 20,
        aviosRequired: 715,
      });
    });

    it("uses the default rate for an unknown route", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, departureAirportCode: "CDG", arrivalAirportCode: "BER" });
      // default rate: 0.02; 20% of 100 = 20; 20 / 0.02 = 1000
      expect(res.body.pricePoints[0]).toEqual({
        percentage: 20,
        cashDiscount: 20,
        aviosRequired: 1000,
      });
    });
  });

  describe("validation errors", () => {
    it("returns 400 when the body is empty", async () => {
      const res = await request(app).post("/price-points").send({});
      expect(res.status).toBe(400);
    });

    it("returns 400 when departureAirportCode is not 3 characters", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, departureAirportCode: "LH" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.departureAirportCode.errors).toBeDefined();
    });

    it("returns 400 when arrivalAirportCode is not 3 characters", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, arrivalAirportCode: "LAXXX" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.arrivalAirportCode.errors).toBeDefined();
    });

    it("returns 400 when price is zero", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, price: 0 });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.price.errors).toBeDefined();
    });

    it("returns 400 when price is negative", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, price: -50 });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.price.errors).toBeDefined();
    });

    it("returns 400 when price is not a number", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, price: "hundred" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.price.errors).toBeDefined();
    });

    it("returns 400 when departureTime is not a valid datetime", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, departureTime: "not-a-date" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.departureTime.errors).toBeDefined();
    });

    it("returns 400 when arrivalTime is not a valid datetime", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, arrivalTime: "not-a-date" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.arrivalTime.errors).toBeDefined();
    });

    it("returns 400 when currency is not 3 characters", async () => {
      const res = await request(app)
        .post("/price-points")
        .send({ ...validBody, currency: "GB" });
      expect(res.status).toBe(400);
      expect(res.body.errors.properties.currency.errors).toBeDefined();
    });
  });
});
