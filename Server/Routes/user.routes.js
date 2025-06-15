import express from "express";
import { getAllUserController, getTopUserController, updateProfileController, userProfileController } from "../Controller/user.controller.js";
import { userSecurityMiddleware } from "../Middleware/user.middleware.js";
import { upload } from '../Middleware/multer.middleware.js';

// !===================================================
// ?==============  Authentication Routes ============
// ?===================================================
//* - Handles user profile requests for profile details

// !===================================================

//? Initialize the express router for authentication routes
const router = express.Router();

//? get request to "/profile" to get user profile data
router.get("/profile", userSecurityMiddleware, userProfileController);

//? get request to "/alluser" to get user profile data
router.get("/all-user", userSecurityMiddleware, getAllUserController);

//? get request to "/topuser" to get top user profile data
router.get("/top-user", userSecurityMiddleware, getTopUserController);

//? get request to "/profile-update" to update user profile
router.put("/profile-update", upload.single("image"), userSecurityMiddleware, updateProfileController);

export const userRouter = router;
