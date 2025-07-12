import { userModel } from "../Models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { taskModel } from "./../Models/task.model.js";
import moment from "moment";

//!=============================================================================================================================================
// !====================================================  get user profile data ================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const userProfileController = async (req, res) => {
  try {
    const profile = req.user;
    res.status(200).json({ success: true, profile });
  } catch (error) {
    //? Send a response with status 500 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !====================================================  update profile =======================================================================
//* - Handles user update profile logic
//* - get user profile data via cookies
// ?============================================================================================================================================

export const updateProfileController = async (req, res) => {
  try {
    const { name, number, email, professions } = req.body;
    const userId = req.user._id;
    const imagefile = req.file;

    const user = await userModel.findById(userId);

    let imageUrl = user.image;

    if (imagefile) {
      const result = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: "image",
        folder: "Nuegas_Profile",
      });

      imageUrl = result.secure_url;
    }

    // ! Update user fields
    user.name = name;
    user.number = number;
    user.email = email;
    user.professions = professions;
    user.image = imageUrl;

    await user.save();

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    //? Send a response with status 500 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !==================================================== to get user profile data ==============================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const getAllUserController = async (req, res) => {
  try {
    const alluser = await userModel.find();

    if (!alluser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, alluser });
  } catch (error) {
    //? Send a response with status 500 in case of error
    res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !==================================================== to get user profile data ==============================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const getTopUserController = async (req, res) => {
  try {
    //! Find users with role "coordinator" or "admin"
    const topUsers = await userModel
      .find({ role: { $in: ["coordinator", "admin"] } })
      .sort({ totalStar: -1 })
      .limit(5);

    return res.status(200).json({ success: true, data: topUsers });
  } catch (error) {
    console.error("Error getTopUserController:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
// !==================================================== to get user data via id ===============================================================
//* - Get user
//* - Get Via User ID
// ?============================================================================================================================================

export const getUserViaId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel
      .findById(id)
      .select("name image role professions");
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error getUserViaIdController:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
//!==================================================== Chart Statistics Controller ===============================================================
//* - Retrieves task statistics for the logged-in user
//* - Calculates total tasks assigned
//* - Counts tasks in progress or completed (excluding pending)
//* - Computes overall checklist progress percentage based on task assessments
//* - Generates weekly task assignment data for the last 7 days (day-wise count)
//* - Prepares pie chart data showing distribution of tasks by progress status (Pending, Progress, Complete)
//* - Returns all above data as JSON response for frontend charts and dashboards
// ?============================================================================================================================================

export const ChartstatController = async (req, res) => {
  try {
    const user = req.user;

    // ! total tasks based on user
    const totalTask = user.tasks.length || 0;

    // ! only in progrss and completed task
    const ongoingTaks = await taskModel
      .find({
        _id: { $in: user.tasks.map((cur) => cur.taskId) },
        progress: { $ne: "pending" },
      })
      .countDocuments();

    // ! all task based on user
    const allTasks = await taskModel.find({
      _id: { $in: user.tasks.map((cur) => cur.taskId) },
    });

    // ! Calculate overall assessment progress
    let totalChecklistItems = 0;
    let totalCompletedItems = 0;

    allTasks.map((task) => {
      totalChecklistItems += Math.round(task.assesment.length);
      totalCompletedItems += Math.round(
        task.assesment.filter((cur) => cur.checked).length
      );
    });

    const TaskProgress = Math.round(
      (totalCompletedItems / totalChecklistItems) * 100
    );

    //! Create default week data
    const weekStats = [];
    const startOfWeek = moment().startOf("week");

    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, "days");
      weekStats.push({
        name: date.format("ddd"),
        dateString: date.format("YYYY-MM-DD"),
        activity: 0,
      });
    }

    //! Count tasks assigned on each day
    allTasks.map((task) => {
      const createdAt = moment(task.createdAt).format("YYYY-MM-DD");
      const matchDay = weekStats.find((day) => day.dateString === createdAt);
      if (matchDay) {
        matchDay.activity += 1;
      }
    });

    const chartData = weekStats.map(({ name, activity }) => ({
      name,
      activity,
    }));

    // ! data for pi chart
    let pending = 0;
    let progress = 0;
    let complete = 0;

    allTasks.map((task) => {
      if (task.progress === "pending") pending++;
      else if (task.progress === "progress") progress++;
      else if (task.progress === "complete") complete++;
    });

    const dataPi = [
      { name: "Pending", value: pending },
      { name: "Progress", value: progress },
      { name: "Compleate", value: complete },
    ];

    const data = { totalTask, ongoingTaks, TaskProgress, chartData, dataPi };

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error ChartstatController:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================

//!=============================================================================================================================================
//!==================================================== Change Role  Controller ===============================================================
//  * - Validates input: ensures both `role` and `id` are provided
//  * - Restricts role updates to only predefined values: admin, coordinator, employee
//  * - Checks if the user exists by ID
//  * - Updates the user's role in the database
//  * - Returns structured JSON response including updated user info
//  * - Responds with appropriate HTTP status codes for errors and success
// ?============================================================================================================================================

export const changeRoleController = async (req, res) => {
  try {
    const { role, id } = req.body;

    if (!role || !id) {
      return res.status(400).json({
        success: false,
        message: "Role and user ID are required",
      });
    }

    const validRoles = ["admin", "coordinator", "employee"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value",
      });
    }

    //! Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
 console.log(role);
 
    // !Update role
    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: {
        userId: user._id,
        name: user.name,
        newRole: user.role,
      },
    });
  } catch (error) {
    console.error("Error changeRoleController:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================
