import { userModel } from '../Models/user.model.js';
import { v2 as cloudinary } from "cloudinary";

//!=============================================================================================================================================
// !====================================================  Logout Controller =====================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const userProfileController = async (req, res) => {
    try {
      const profile = req.user;  
      res.status(200).json({ success: true, profile});
    } catch (error) {
      //? Send a response with status 500 in case of error
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // !============================================================================================================================================
  // ?============================================================================================================================================



//!=============================================================================================================================================
// !====================================================  Logout Controller =====================================================================
//* - Handles user logout logic
//* - Clears the authentication token cookie
//* - Sets secure cookie options based on environment (production/development)
//* - Responds with success message on successful logout
// ?============================================================================================================================================

export const updateProfileController = async (req, res) => {
    try {
      const { name, number, email, professions } = req.body;
      const userId = req.user._id;
      const imagefile = req.file;
    
      const user = await userModel.findById(userId);

      let imageUrl = user.image;

      if (imagefile) {
        const result = await cloudinary.uploader.upload(imagefile.path,{
          resource_type:"image",
          folder:"Nuegas_Profile"
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