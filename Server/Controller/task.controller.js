import { taskModel } from "../Models/task.model.js";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "./../Models/user.model.js";
import mongoose from "mongoose";

//!=============================================================================================================================================
// !====================================================  Add task Controller =====================================================================
//* - Handles logic to create a new task
//* - Parses JSON fields (members, attachments, assessment) from request
//* - Uploads task image to Cloudinary if provided
//* - Validates required fields and prevents empty submissions
//* - Saves task details to MongoDB (taskModel)
//* - Responds with success message on successful task creation
// ?============================================================================================================================================

export const addTaskController = async (req, res) => {
  try {
    let {
      title,
      description,
      deadline,
      priority,
      members,
      attachments,
      assesment,
      heading,
    } = req.body;
    const image = req.file;
    const user = req.user;

    members = JSON.parse(members);
    attachments = JSON.parse(attachments);
    assesment = JSON.parse(assesment);

    if (
      !title ||
      !description ||
      !deadline ||
      !priority ||
      !members ||
      !image ||
      !assesment ||
      !heading
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (members.length === 0 || assesment.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let imageUrl = null;
    let public_id = null;
    // ! set image url
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
        folder: "Nugas_Tasks",
      });
      imageUrl = result.secure_url;
      public_id = result.public_id;
    }

    const images = { image: imageUrl, public_id };

    // ! adding data into database task collection
    const task = new taskModel({
      userId: user._id,
      title: title,
      description: description,
      deadline: deadline,
      priority: priority,
      members: members,
      attachments: attachments,
      assesment: assesment,
      image: images,
      heading: heading,
    });

    await task.save();

    //! Update each member with task ID and increment stars
    await Promise.all(
      members.map(async (cur) => {
        const userDoc = await userModel.findById(cur.id);
        if (userDoc) {
          userDoc.tasks.push({ taskId: task._id });
          userDoc.totalStar = (userDoc.totalStar || 0) + 5;
          await userDoc.save();
          return userDoc;
        }
        return null;
      })
    );

    res.status(200).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    console.error("Error adding task controller:", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Add task Controller =====================================================================
//* - Handles logic to get all tasks for a specific user
//* - Assumes `req.user.tasks` contains an array of task references (_id)
//* - Fetches full task details for each task id using `taskModel.findById`
//* - Returns all tasks in JSON response
// ?============================================================================================================================================

export const allTaskController = async (req, res) => {
  try {
    const userTasks = req.user.tasks;

    const allTasks = await Promise.all(
      userTasks.map(async (cur) => {
        return await taskModel.findById(cur.taskId);
      })
    );

    res.status(200).json({
      success: true,
      allTasks,
    });
  } catch (error) {
    console.error("Error adding task controller:", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  Get task Via task id =====================================================================
//* - Handles logic to get a single task by its ID passed in URL params (`req.params.id`)
//* - Finds task document by ID using `taskModel.findById`
//* - Returns the task data as JSON response
// ?============================================================================================================================================

export const getTaskViaId = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error adding task controller:", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !================================================  Update task Attachment Controller ========================================================
//* - Updates task attachments by uploading image to Cloudinary
//* - Requires task ID and image in the request
//* - Validates task and image presence
//* - Appends new attachment object to the task's attachments array
//* - Saves to MongoDB and responds with a success message
// ?============================================================================================================================================

export const UpdateTaskAttachmentController = async (req, res) => {
  try {
    const { taskID } = req.body;
    const user = req.user;
    const image = req.file;

    const task = await taskModel.findById(taskID);

    if (!task || task.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Task Not Found" });
    }

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image Not Found" });
    }

    // ! set image url
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      folder: "Nugas_Tasks",
    });

    const imageUrl = result.secure_url;
    const public_id = result.public_id;
    const id = Math.floor(Math.random() * 999999);

    const attachment = { link: imageUrl, id, user: user._id, public_id };

    // ! set attachment
    task.attachments.push(attachment);
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Attachment added successfully",
    });
  } catch (error) {
    console.error("Error updating attachment task controller:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !============================================ Delete Task Attachment Controller =============================================================
//* - Deletes a specific attachment from a task's attachment list
//* - Requires: link, id (attachment ID), user (uploader ID), taskId, and optionally public_id (Cloudinary)
//* - Validates input fields for completeness
//* - Authorizes deletion: Only the original uploader or an admin can delete
//* - If a public_id is present, deletes the image from Cloudinary
//* - Updates the task document in MongoDB to remove the attachment object
//* - Returns a success or error response accordingly
// ?============================================================================================================================================

export const DeleteTaskAttachmentController = async (req, res) => {
  try {
    const { link, id, user, public_id, taskId } = req.body;
    const { _id, role } = req.user;

    //! Validate required fields
    if (!link || !id || !user || !taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Data Not Found" });
    }

    //! Authorization check: Only uploader or admin can delete
    if (user !== _id.toString() && role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "You are not allowed" });
    }

    //! Optional: Delete image from Cloudinary if public_id is present
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    //! Remove attachment from the task in DB
    await taskModel.findByIdAndUpdate(taskId, {
      $pull: {
        attachments: { link },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Attachment Deleted successfully",
    });
  } catch (error) {
    console.error("Error updating attachment task controller:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !============================================ Delete Task Controller =============================================================
//* - Deletes a specific attachment from a task's attachment list
//* - Requires: link, id (attachment ID), user (uploader ID), taskId, and optionally public_id (Cloudinary)
//* - Validates input fields for completeness
//* - Authorizes deletion: Only the original uploader or an admin can delete
//* - If a public_id is present, deletes the image from Cloudinary
//* - Updates the task document in MongoDB to remove the attachment object
//* - Returns a success or error response accordingly
// ?============================================================================================================================================

export const DeleteTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = req.user;
    const task = await taskModel.findById(taskId);

    //! Authorization check: Only uploader or admin can delete
    if (user._id !== task?.userId.toString() && user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "You are not allowed" });
    }

    //! Validate required fields
    if (!taskId || !task) {
      return res
        .status(400)
        .json({ success: false, message: "Task Not Found" });
    }

    //! Delete image from Cloudinary if public_id is present
    if (task?.image.public_id) {
      await cloudinary.uploader.destroy(task?.image.public_id);
    }

    //! Delete all attachments from Cloudinary
    if (task.attachments?.length > 0) {
      for (const attachment of task.attachments) {
        if (attachment?.public_id) {
          await cloudinary.uploader.destroy(attachment?.public_id);
        }
      }
    }

    //! Remove task ID from all members’ task arrays
    const idToRemove = new mongoose.Types.ObjectId(taskId);

    const updatePromises = task.members.map(async (cur) => {
      await userModel.findByIdAndUpdate(cur.id, {
        $pull: { tasks: { taskId: idToRemove } },
      });
    });
    await Promise.all(updatePromises);

    //! Delete the task from database
    await taskModel.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    console.error("Error updating attachment task controller:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================
