import express  from 'express';
import { addTaskController, allTaskController } from '../Controller/task.controller.js';
import { userSecurityMiddleware } from './../Middleware/user.middleware.js';
import { upload } from '../Middleware/multer.middleware.js';

//? Initialize the express router for authentication routes
const router = express.Router();

//? POST request to "/add-task" to handle adding task
router.post("/add-task", upload.single("image"),userSecurityMiddleware,addTaskController);

//? POST request to "/add-task" to handle adding task
router.get("/all-task-user",userSecurityMiddleware,allTaskController);


export const taskRouter = router;