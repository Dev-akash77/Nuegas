import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../Controller/auth.controller.js";
import { userSecurityMiddleware } from "../Middleware/user.middleware.js";

// !===================================================
// ?==============  Authentication Routes ============
// ?===================================================
//* - Handles user signup requests for registration
//* - Routes POST request to "/signup" to the registerController function
//* - The registerController is responsible for handling user registration logic
//* - It ensures proper error handling for failed registration attempts
// !===================================================

//? Initialize the express router for authentication routes
const router = express.Router();

//? POST request to "/signup" to handle user registration
router.post("/register", registerController);

//? POST request to "/login" to handle user registration
router.post("/login", loginController);

//? POST request to "/logout" to handle user registration
router.post("/logout", userSecurityMiddleware, logoutController);


//? Export the authentication router for use in the main app
export const authRouter = router;
