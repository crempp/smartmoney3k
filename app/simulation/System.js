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
        new TrailingAction(data.action, percentChange, data.trailingSeconds)
      )
    }
  }

  // updateCost() {
  //   this.nextCPUCost = this.nextCPUCosFunction();
  //   this.nextMemCost = this.nextMemCostFunction();
  // }

  run(exhange, actionCB) {
    for (let module of this.modules) {
      module.run(exhange, actionCB);
    }
  }
};