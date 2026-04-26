// ABOUTME: Calculates the four Avios price points for a given flight price and rate.
// ABOUTME: Pure function — no I/O or external dependencies.

const PERCENTAGES = [20, 50, 70, 100] as const;

export interface PricePoint {
  percentage: number;
  cashDiscount: number;
  aviosRequired: number;
}

export function calculatePricePoints(price: number, valuePerAvios: number): PricePoint[] {
  return PERCENTAGES.map((percentage) => {
    const cashDiscount = price * (percentage / 100);
    const aviosRequired = Math.ceil(cashDiscount / valuePerAvios);
    return { percentage, cashDiscount, aviosRequired };
  });
}
