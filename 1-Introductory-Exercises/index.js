// Your code goes here
const { HttpServer } = require("@aliceo2/web-ui");
const { WebSocket, WebSocketMessage } = require("@aliceo2/web-ui");
const { LogManager } = require("@aliceo2/web-ui");

const logger = LogManager.getLogger("my-app");

// create instance of http server
const http = new HttpServer(
  {
    port: 8080,
  },
  {
    secret: "secret",
    expiration: "1h",
  }
);

http.addStaticPath("public");
console.log(http.o2TokenService.generateToken());
// routes
http.get(
  "/hi",
  (req, res) => {
    res.status(200).json({ message: "Hello world" });
  },
  { public: false }
);

const wsServer = new WebSocket(http);

wsServer.bind("hello", (message) => {
  logger.infoMessage("message: ", message.payload);
  return new WebSocketMessage()
    .setCommand("hello-back")
    .setPayload("hello back");
});
