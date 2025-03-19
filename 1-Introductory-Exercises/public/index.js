let url = new URL(window.location);
const token = url.searchParams.get("token");
let wsConnector = new WebSocket(`ws://localhost:8080?token=${token}`);
wsConnector.onopen = function () {
  console.log("WebSocket connection established");
  const message = {
    command: "hello",
    payload: "hi",
    token: token,
  };
  wsConnector.send(JSON.stringify(message));
};

wsConnector.onmessage = function (message) {
  console.log(message);
};
