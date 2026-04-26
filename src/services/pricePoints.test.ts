// ABOUTME: Unit tests for the price points calculation service.
// ABOUTME: Covers all four percentages, ceiling rounding, and rate variations.

import { calculatePricePoints } from "./pricePoints";

describe("calculatePricePoints", () => {
  it("returns four price points for the four percentages", () => {
    const result = calculatePricePoints(100, 0.02);
    expect(result.map((p) => p.percentage)).toEqual([20, 50, 70, 100]);
  });

  it("calculates cash discount correctly for each percentage", () => {
    const result = calculatePricePoints(200, 0.02);
    expect(result[0].cashDiscount).toBe(40);
    expect(result[1].cashDiscount).toBe(100);
    expect(result[2].cashDiscount).toBe(140);
    expect(result[3].cashDiscount).toBe(200);
  });

  it("uses the default rate (0.02) correctly", () => {
    const result = calculatePricePoints(100, 0.02);
    // 20 / 0.02 = 1000 exactly
    expect(result[0].aviosRequired).toBe(1000);
    // 50 / 0.02 = 2500 exactly
    expect(result[1].aviosRequired).toBe(2500);
  });

  it("uses a route-specific rate correctly", () => {
    // LHR-JFK rate: 0.03
    const result = calculatePricePoints(100, 0.03);
    // 20 / 0.03 = 666.66... → ceil → 667
    expect(result[0].aviosRequired).toBe(667);
  });

  it("applies ceiling rounding to avios — fractional avios round up", () => {
    // LHR-LAX rate: 0.028; 20 / 0.028 = 714.285... → 715
    const result = calculatePricePoints(100, 0.028);
    expect(result[0].aviosRequired).toBe(715);
  });

  it("does not round up avios when the result is a whole number", () => {
    // 100 / 0.02 = 5000 exactly
    const result = calculatePricePoints(100, 0.02);
    expect(result[3].aviosRequired).toBe(5000);
  });
});
