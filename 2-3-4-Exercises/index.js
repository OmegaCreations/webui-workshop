const path = require("path");
const config = require("./config.js");

const { HttpServer } = require("@aliceo2/web-ui");
const { WebSocket, WebSocketMessage } = require("@aliceo2/web-ui");
const applicationService = require("./lib/applicationService.js");

const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, "public"));

http.get("/info", (_req, res) => {
  res.status(200).json(applicationService.getInfo());
});

const ws = new WebSocket(http);

ws.bind("random", async (msg) => {
  console.log(msg);
  try {
    const randomNum = Math.floor(Math.random() * 10);
    return new WebSocketMessage()
      .setCommand("random-res")
      .setPayload(randomNum);
  } catch (error) {
    return new WebSocketMessage().setCommand("error").setPayload(error.message);
  }
});
