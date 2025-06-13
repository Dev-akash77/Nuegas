import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ! start connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId);


  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // for (const key in users) {
    //   if (users[key] === socket.id) {
    //     delete users[key];
    //     break;
    //   }
    // }
  });
});
