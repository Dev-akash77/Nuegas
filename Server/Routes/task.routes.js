import express from "express";
import {
  addTaskController,
  allTaskController,
  DeleteTaskAttachmentController,
  getTaskViaId,
  UpdateTaskAttachmentController,
} from "../Controller/task.controller.js";

import { userSecurityMiddleware } from "./../Middleware/user.middleware.js";
import { upload } from "../Middleware/multer.middleware.js";

//? Initialize the express router for authentication routes
const router = express.Router();

//? POST request to "/add-task" to handle adding task
router.post(
  "/add-task",
  upload.single("image"),
  userSecurityMiddleware,
  addTaskController
);

//? POST request to "/add-task-user" to handle adding task
router.get("/", userSecurityMiddleware, allTaskController);

//? POST request to "/task/:id" to handle adding task
router.get("/:id", userSecurityMiddleware, getTaskViaId);

//? POST request to "/attachment-update" to handle update task attachment
router.put(
  "/attachment-update",
  upload.single("image"),
  userSecurityMiddleware,
  UpdateTaskAttachmentController
);

//? POST request to "/attachment-delete" to handle delete task attachment
router.delete(
  "/attachment-delete",
  userSecurityMiddleware,
  DeleteTaskAttachmentController
);

export const taskRouter = router;
