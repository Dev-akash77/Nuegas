import { taskModel } from "../Models/task.model.js";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "./../Models/user.model.js";

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

    // ! set image url
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
        folder: "Nugas_Tasks",
      });
      imageUrl = result.secure_url;
    }

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
      image: imageUrl,
      heading: heading,
    });

    await task.save();

    //! Update each member with task ID and increment stars
    await Promise.all(
      members.map(async (cur) => {
        const userDoc = await userModel.findById(cur.id);
        if (userDoc) {
          userDoc.tasks.push(task._id);
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
        return await taskModel.findById(cur._id);
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
