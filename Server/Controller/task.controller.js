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
      !assesment
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
    });

    await task.save();

    //! Update each member with task ID and increment stars
    const updatedUsers = await Promise.all(
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
//* - Handles logic to get alltask for spcific users
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
