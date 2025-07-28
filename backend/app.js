import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { chatSocket } from "./socket/chatSocket.js";
dotenv.config();
const PORT = process.env.PORT || 1009;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
chatSocket(io);

server.listen(PORT, () => {
  console.log("DONE");
});
