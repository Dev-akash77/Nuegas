import cors from "cors";
import express from "express";
import "dotenv/config";
import { DataBaseConnect } from "./Config/database.config.js";
import { authRouter } from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./Routes/user.routes.js";
import { cloudenaryConnection } from "./Config/cloudenary.config.js";
import { taskRouter } from "./Routes/task.routes.js";
import { app, server } from "./socket.js";
import { messageRouter } from "./Routes/message.routes.js";

const PORT = process.env.PORT;


 
//! ===================================================
//? { Middleware Initialize }
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://nuegas-akash.vercel.app",
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//! ===================================================



//! ===================================================
//? { MongoDB Connection }
DataBaseConnect();

//? { Cloudenary Connection }
cloudenaryConnection();
//! ===================================================



//! ===================================================
//? { Server Rutes Setup }

//* { Auth Rutes Endpoints }
app.use("/auth",authRouter);

//* { user Rutes Endpoints }
app.use("/user",userRouter);

//* { task Rutes Endpoints }
app.use("/task",taskRouter);

//* { message Rutes Endpoints }
app.use("/message",messageRouter);

//! ===================================================


//! ===================================================
//? { Server PORT Initialize }
server.listen(PORT, () => {
  console.log("Server running at the port of " + PORT);
});
//! ===================================================
