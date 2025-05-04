import { taskModel } from "../Models/task.model.js";
import { v2 as cloudinary } from "cloudinary";
//!=============================================================================================================================================
// !====================================================  add task Controller =====================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const addTaskController = async (req, res) => {
  try {
    let {title,description,deadline,priority,members,attachments,assesment} = req.body;
    const image = req.file;
    const user = req.user;

    members = JSON.parse(members);
    attachments = JSON.parse(attachments);
    assesment = JSON.parse(assesment);

    if (!title ||!description ||!deadline ||!priority ||!members ||!attachments ||!assesment ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (members.length === 0 ||attachments.length === 0 || assesment.length === 0) {

      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }


    let imageUrl = null;

    // ! set image url
    if (image) {
      const result = await cloudinary.uploader.upload(image.path,{
        resource_type:"image",
        folder:"Nugas_Tasks"
      });
      imageUrl = result.secure_url;
    }


    // ! adding data into database task collection
    const task = new taskModel({
      userId:user._id,
      title:title,
      description:description,
      deadline:deadline,
      priority:priority,
      members:members,
      attachments:attachments,
      assesment:assesment,
      image:imageUrl
    })

    await task.save();


    res
      .status(200)
      .json({ success: true, message: "Task added successfully"});

  } catch (error) {
    console.error("Error adding task controller:", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

// !============================================================================================================================================
// ?============================================================================================================================================
