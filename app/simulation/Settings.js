// Core game settings
export const simulationTickMs = 1000;
export const chartTimeSliceSeconds = 5;

export const backfillTicks = 100 * 5;

// Gameplay Mechanics
// This can help https://www.desmos.com/calculator
export const minStockCount = 3;
export const maxStockCount = 5;
export const initialCash = 2000;
export const initialCPUCount = 1;
export const initialMemCount = 1;
export function cpuCostIncrement(count) {
  return count * 100.00 + (count * 200);
}
export function memCostIncrement(count) {
  return count * 100.00 + (count * 400);
}
export const initialMinStockValue = 10;
export const initialMaxStockValue = 100;

export const priceChangeMean = 0;
export const priceChangeStdDev = 0.5;
export const volumeChangeMean = 0;
export const volumeChangeStdDev = 25;

export const volumeDownwardResistancePoint = 25;
export const volumeDownwardResistanceFactor = .2;
export const volumeUpwarddResistancePoint = 5000;
export const volumeUpwarddResistanceFactor = .2;

export const priceDownwardResistancePoint = 5;
export const priceDownwardResistanceFactor = .2;
export const priceUpwarddResistancePoint = 500;
export const priceUpwarddResistanceFactor = .2;

// AI Modules
export const moduleAttributes = {
  trailingAction: {
    cpuUsage: 0.4,
    memUsage: 0.4,
    cost: 300,
    percentChangeDefault: 7,
    trailingSecondsDefault: 10,
  }
}