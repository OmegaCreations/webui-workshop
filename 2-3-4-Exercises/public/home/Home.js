import { Observable } from "/js/src/index.js";

export default class Home extends Observable {
  constructor() {
    super();
    this.userName = "username";
  }

  /**
   * @param {string} newUserName new username
   * @description Sets userName variable
   */
  setUserName(newUserName) {
    this.userName = newUserName;
    this.notify();
  }

  /**
   * @returns userName variable
   */
  getUserName() {
    return this.userName;
  }
}
