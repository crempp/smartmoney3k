import { initialCPUCount, initialMemCount, cpuCostIncrement,
  memCostIncrement } from './Settings';
import TrailingAction from './AIModules/TrailingAction';

export default class System {
  constructor(state) {
    this.state = state
    this.cpuCount = initialCPUCount;
    this.memCount = initialMemCount;
    this.nextCPUCost = this.nextCPUCosFunction();
    this.nextMemCost = this.nextMemCostFunction();
    this.modules = [];
    this.usedCPU = 0;
    this.usedMem = 0;
  }

  purchaseCPU(count) {
    this.cpuCount += count;
    this.nextCPUCost = this.nextCPUCosFunction();
  }

  purchaseMem(count) {
    this.memCount += count;
    this.nextMemCost = this.nextMemCostFunction();
  }

  nextCPUCosFunction() {
    return cpuCostIncrement(this.cpuCount);
  }

  nextMemCostFunction() {
    return memCostIncrement(this.memCount);
  }

  addModule(data) {
    // console.debug("addModule");
    if (data['module'] === "trailingAction") {
      // percentChange comes as a percent, convert to decimal
      let percentChange = data.percentChange / 100.0;
      this.modules.push(
        new TrailingAction(
          this.state,
          data.action,
          data.direction,
          percentChange,
          data.trailingSeconds)
      )
    }
  }

  // updateCost() {
  //   this.nextCPUCost = this.nextCPUCosFunction();
  //   this.nextMemCost = this.nextMemCostFunction();
  // }

  run(actionCB) {
    this.usedCPU = 0;
    this.usedMem = 0;

    for (let module of this.modules) {
      if (module.enabled) {
        module.run(actionCB);
        this.usedCPU += module.cpuUsed;
        this.usedMem += module.memUsed;
      }
    }
  }
};