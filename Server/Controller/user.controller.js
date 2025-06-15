import { userModel } from "../Models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

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

    if (!topUsers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No top users found" });
    }

    return res.status(200).json({ success: true, data: topUsers });
  } catch (error) {
    console.error("Error getTopUserController:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// !============================================================================================================================================
// ?============================================================================================================================================
