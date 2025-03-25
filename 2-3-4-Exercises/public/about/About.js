import { Observable } from "/js/src/index.js";

export default class About extends Observable {
  constructor() {
    super();
    this.data = {
      test: ["test data", "test data 2", "test data 3"],
      test2: ["test data", "test data 2", "test data 3", "test data 4"],
    };
    this.requestedTimes = 0;
  }

  /**
   * @returns data in JSON format
   */
  getDetails() {
    this.requestedTimes++;
    this.notify();

    return this.data;
  }
}
