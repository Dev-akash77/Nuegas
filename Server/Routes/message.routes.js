import express from "express";
import { userSecurityMiddleware } from './../Middleware/user.middleware.js';
import { allMessageUser, getConversationMessages, sendMessage } from "../Controller/message.controller.js";
import { upload } from "../Middleware/multer.middleware.js";

// !===================================================
// ?==============  Message Routes ============
// ?===================================================
//* - Handles user signup requests for registration
//* - Handles user login requests for login
//* - Handles user logout requests for logout

// !===================================================

//? Initialize the express router for authentication routes
const router = express.Router();

//? get request to "/message/user" to handle user user
 router.get("/user",userSecurityMiddleware,allMessageUser);

//? post request to "/message/send" to handle user send message
 router.post("/send",userSecurityMiddleware,upload.single("image"),sendMessage);

//? get request to "/message/getMessage/:sender" to get all message based on user
 router.get("/getMessage/:sender",userSecurityMiddleware,getConversationMessages);


//? Export the authentication router for use in the main app
export const messageRouter = router;
 