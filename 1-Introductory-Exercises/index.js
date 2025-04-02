// Your code goes here
const { HttpServer } = require("@aliceo2/web-ui");
const { WebSocket, WebSocketMessage } = require("@aliceo2/web-ui");
const { LogManager } = require("@aliceo2/web-ui");
const cors = require("cors");

const logger = LogManager.getLogger("my-app");

// create instance of http server
const http = new HttpServer(
  {
    port: 8081,
  },
  {
    secret: "secret",
    expiration: "1h",
  }
);

http.app.use(cors("*"));

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

http.get(
  "info",
  (req, res) => {
    res.status(200).json({
      data: {
        header1: "some data",
        header2: ["same data", "some data"],
        hader3: ["some data1", "some data2", "some data 3"],
      },
    });
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
