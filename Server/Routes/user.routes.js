import express from "express";
import { userProfileController } from "../Controller/user.controller.js";
import { userSecurityMiddleware } from "../Middleware/user.middleware.js";

// !===================================================
// ?==============  Authentication Routes ============
// ?===================================================
//* - Handles user profile requests for profile details

// !===================================================

//? Initialize the express router for authentication routes
const router = express.Router();

//? get request to "/profile" to handle user registration
router.get("/profile", userSecurityMiddleware, userProfileController);

export const userRouter = router;
