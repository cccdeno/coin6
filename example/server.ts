import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

export function server() {
  const wss = new WebSocketServer(8080);
  wss.on("connection", function (ws: WebSocketClient) {
    ws.on("message", function (message: string) {
      console.log(message);
      ws.send(message);
    });
  });
}

server()


