import { Observable, fetchClient, RemoteData } from "/js/src/index.js";

export const getFetchStatus = (remoteData) => {
  return remoteData.match({
    NotAsked: () => "No data fetched",
    Loading: () => "Loading",
    Success: (_res) => `Loaded`,
    Failure: (error) => `Error: ${error.message}`,
  });
};

export default class About extends Observable {
  constructor(loader) {
    super();
    this.data = {};
    this.requestedTimes = 0;
    this.loader = loader;

    this.remoteData = RemoteData.NotAsked();
  }

  /**~~~~
   * @return fetches application data in JSON format
   */
  getDetails() {
    this.remoteData = RemoteData.loading();

    this.requestedTimes++;
    this.notify();

    this.loader
      .get("/api/info")
      .then(async (res) => {
        this.data = await res.result.data;
        this.remoteData = RemoteData.success();
        this.notify();
        console.log(res.result.data);
        return this.data;
      })
      .catch((_) => {
        this.remoteData = RemoteData.failure();
        this.notify();
        return {};
      });
  }
}
