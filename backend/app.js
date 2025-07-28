import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const PORT = 1009;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
server.listen(PORT, () => {
  console.log("DONE");
});
