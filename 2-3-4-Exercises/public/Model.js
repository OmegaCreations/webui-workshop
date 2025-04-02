import {
  Observable,
  QueryRouter,
  Loader,
  sessionService,
  WebSocketClient,
} from "/js/src/index.js";
import Home from "./home/Home.js";
import About from "./about/About.js";

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    this.randomNumber = 0;
    this.ws = new WebSocketClient("ws://localhost:8080");

    this.ws.addListener("authed", () => {
      console.log("connected!");
      this.ws.sendMessage({ command: "random" });
    });

    this.ws.addListener("random-res", (message) => {
      this.randomNumber = message.payload;
      this.notify();
      console.log("Number:", this.randomNumber);
    });

    this.ws.addListener("error", (error) => {
      console.error("Err:", error);
    });

    // Home model
    this.homeModel = new Home();
    this.homeModel.bubbleTo(this);

    // About model
    this.aboutModel = new About(this.loader);
    this.aboutModel.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    this.handleLocationChange();
  }

  /**
   * Delegates sub-model actions depending on new location of the page
   */
  handleLocationChange() {
    switch (this.router.params.page) {
      case "home":
        break;
      case "about":
        break;
      default:
        this.router.go("?page=home");
        break;
    }
  }
}
