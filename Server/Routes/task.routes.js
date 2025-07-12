import express from "express";
import {
  addTaskController,
  allTaskController,
  DeleteTaskAttachmentController,
  DeleteTaskController,
  getTaskViaId,
  recentTaskController,
  toggleAssesmentController,
  UpdateTaskAttachmentController,
} from "../Controller/task.controller.js";

import { userSecurityMiddleware } from "./../Middleware/user.middleware.js";
import { upload } from "../Middleware/multer.middleware.js";
import { adminMiddleware } from "../Middleware/admin.middleware.js";

//? Initialize the express router for authentication routes
const router = express.Router();

//? POST request to "/add-task" to handle adding task
router.post(
  "/add-task",
  upload.single("image"),
  userSecurityMiddleware,
  adminMiddleware,
  addTaskController
);

//? GET request to "/all-task-user" to handle adding task
router.get("/", userSecurityMiddleware, allTaskController);

//? GET request to "/task/:id" to handle get task
router.get("/selcted/:id", userSecurityMiddleware, getTaskViaId);

//? GET request to "/task/recent" to handle get recent updated task
router.get("/recent", userSecurityMiddleware, recentTaskController);

//? PUT request to "/attachment-update" to handle update task attachment
router.put(
  "/attachment-update",
  upload.single("image"),
  userSecurityMiddleware,
  UpdateTaskAttachmentController
);

//? PUT request to "/assesment-update" to handle update task assesment
router.put(
  "/assesment-update",
  userSecurityMiddleware,
  toggleAssesmentController
);

//? DELETE request to "/attachment-delete" to handle delete task attachment
router.delete(
  "/attachment-delete",
  userSecurityMiddleware,
  DeleteTaskAttachmentController
);

//? DELETE request to "/attachment-delete" to handle delete task attachment
router.delete(
  "/delete/:taskId",
  userSecurityMiddleware,
  DeleteTaskController
);

export const taskRouter = router;
