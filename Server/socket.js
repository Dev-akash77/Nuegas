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
export const userSocketMap = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap.set(userId, socket.id);
  console.log("User connected:", userSocketMap);

  // ! Join task room
  socket.on("join-task", (taskId) => {
    socket.join(taskId);
    console.log(`User ${userId} joined task room: ${taskId}`);
  });

  // ! Leave task room (optional cleanup)
  socket.on("leave-task", (taskId) => {
    socket.leave(taskId);
    console.log(`User ${userId} left task room: ${taskId}`);
  });

  socket.on("disconnect", () => {
    for (const [key, value] of userSocketMap.entries()) {
      if (value === socket.id) {
        userSocketMap.delete(key);
        break;
      }
    }
    console.log("User disconnected:", userSocketMap);
  });
});
