import cors from "cors";
import express from "express";
import "dotenv/config";
import { DataBaseConnect } from "./Config/database.config.js";
import { authRouter } from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./Routes/user.routes.js";
import { cloudenaryConnection } from "./Config/cloudenary.config.js";

const app = express();
const PORT = process.env.PORT;



//! ===================================================
//? { Middleware Initialize }
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://nuegas-akash.vercel.app",
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
); 
app.use(express.json());
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
app.use("/auth",authRouter)

//* { user Rutes Endpoints }
app.use("/user",userRouter)

//! ===================================================




//! ===================================================
//? { Server PORT Initialize }
app.listen(PORT, () => {
  console.log("Server running at the port of " + PORT);
});
//! ===================================================
