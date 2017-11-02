// Core game settings
export const simulationTickMs = 1000;
export const chartTimeSliceSeconds = 5;

// Gameplay Mechanics
// This can help https://www.desmos.com/calculator
export const initialCash = 1000;
export const initialCPUCount = 1;
export const initialMemCount = 1;
export function cpuCostIncrement(count) {
  return count * 100.00 + (count * 200);
}
export function memCostIncrement(count) {
  return count * 100.00 + (count * 400);
}


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